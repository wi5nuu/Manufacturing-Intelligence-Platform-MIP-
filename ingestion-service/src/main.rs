use ingestion_service::adapters::mqtt::{start_mock_mqtt_stream, RawSensorData};
use ingestion_service::pipeline::validator::validate_raw_data;
use ingestion_service::kafka::producer::KafkaProducer;
use ingestion_service::proto::SensorReading;
use prost::Message;
use tracing::{info, error, Level};
use tracing_subscriber::FmtSubscriber;
use tokio::sync::mpsc;
use chrono::Utc;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize logging
    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::INFO)
        .finish();
    tracing::subscriber::set_global_default(subscriber)?;

    info!("Manufacturing Intelligence Platform - Ingestion Service starting...");

    let (tx, mut rx) = mpsc::channel::<RawSensorData>(100);

    // Start mock MQTT adapter
    tokio::spawn(async move {
        start_mock_mqtt_stream(tx).await;
    });

    // Kafka Producer setup
    let kafka_brokers = std::env::var("KAFKA_BROKERS").unwrap_or_else(|_| "localhost:9092".to_string());
    let kafka_topic = "manufacturing.raw";
    
    // In a real scenario, we might want to handle Kafka being down gracefully
    let producer = match KafkaProducer::new(&kafka_brokers, kafka_topic) {
        Ok(p) => {
            info!("Connected to Kafka at {}", kafka_brokers);
            Some(p)
        },
        Err(e) => {
            error!("Failed to connect to Kafka: {}. Running in dry-run mode.", e);
            None
        }
    };

    // Processing Loop
    while let Some(raw_data) = rx.recv().await {
        // 1. Validate
        if let Err(e) = validate_raw_data(&raw_data) {
            error!("Validation failed for {:?}: {}", raw_data, e);
            continue;
        }

        // 2. Normalize & Map to Protobuf
        let sensor_reading = SensorReading {
            time: Some(prost_types::Timestamp {
                seconds: Utc::now().timestamp(),
                nanos: Utc::now().timestamp_subsec_nanos() as i32,
            }),
            machine_id: raw_data.machine_id.clone(),
            parameter: raw_data.parameter.clone(),
            value: raw_data.value,
            unit: raw_data.unit.unwrap_or_default(),
            quality: 100,
        };

        // 3. Serialize
        let mut buf = Vec::new();
        sensor_reading.encode(&mut buf)?;

        // 4. Send to Kafka
        if let Some(ref p) = producer {
            if let Err(e) = p.send_message(&sensor_reading.machine_id, &buf).await {
                error!("Failed to send to Kafka: {}", e);
            } else {
                info!("Sent sensor data for machine: {}", sensor_reading.machine_id);
            }
        } else {
            info!("Dry-run: Received and validated data for {}", sensor_reading.machine_id);
        }
    }

    Ok(())
}
