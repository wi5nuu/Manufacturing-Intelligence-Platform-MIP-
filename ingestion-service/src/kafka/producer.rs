use rdkafka::producer::{FutureProducer, FutureRecord};
use rdkafka::config::ClientConfig;
use std::time::Duration;
use tracing::{info, error};
use anyhow::Result;

pub struct KafkaProducer {
    producer: FutureProducer,
    topic: String,
}

impl KafkaProducer {
    pub fn new(brokers: &str, topic: &str) -> Result<Self> {
        let producer: FutureProducer = ClientConfig::new()
            .set("bootstrap.servers", brokers)
            .set("message.timeout.ms", "5000")
            .create()?;
        
        Ok(Self {
            producer,
            topic: topic.to_string(),
        })
    }

    pub async fn send_message(&self, key: &str, payload: &[u8]) -> Result<()> {
        let record = FutureRecord::to(&self.topic)
            .payload(payload)
            .key(key);
        
        self.producer.send(record, Duration::from_secs(0))
            .await
            .map_err(|(e, _)| anyhow::anyhow!("Kafka send error: {}", e))?;
        
        Ok(())
    }
}
