use tracing::{info, error};
use tokio::time::{sleep, Duration};
use serde::{Serialize, Deserialize};
use chrono::Utc;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RawSensorData {
    pub machine_id: String,
    pub parameter: String,
    pub value: f64,
    pub unit: Option<String>,
}

pub async fn start_mock_mqtt_stream(tx: tokio::sync::mpsc::Sender<RawSensorData>) {
    info!("Starting mock MQTT stream...");
    
    let machines = vec![
        "LINE-A-PRESS-01",
        "LINE-A-CNC-02",
        "LINE-B-WELD-01",
    ];

    loop {
        for machine in &machines {
            let data = RawSensorData {
                machine_id: machine.to_string(),
                parameter: "temperature".to_string(),
                value: 60.0 + (rand::random::<f64>() * 20.0),
                unit: Some("C".to_string()),
            };

            if let Err(e) = tx.send(data).await {
                error!("Failed to send mock data: {}", e);
                return;
            }
        }
        sleep(Duration::from_secs(1)).await;
    }
}
