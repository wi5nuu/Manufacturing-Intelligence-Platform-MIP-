use crate::adapters::mqtt::RawSensorData;
use anyhow::{Result, bail};

pub fn validate_raw_data(data: &RawSensorData) -> Result<()> {
    if data.machine_id.is_empty() {
        bail!("Machine ID is empty");
    }
    if data.parameter.is_empty() {
        bail!("Parameter is empty");
    }
    // Example range validation
    if data.parameter == "temperature" && (data.value < -50.0 || data.value > 500.0) {
        bail!("Temperature out of range: {}", data.value);
    }
    
    Ok(())
}
