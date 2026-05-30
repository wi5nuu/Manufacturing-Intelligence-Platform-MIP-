use ingestion_service::adapters::mqtt::RawSensorData;
use ingestion_service::pipeline::validator::validate_raw_data;

#[test]
fn test_validation_success() {
    let data = RawSensorData {
        machine_id: "MACHINE-01".to_string(),
        parameter: "temperature".to_string(),
        value: 25.5,
        unit: Some("C".to_string()),
    };
    assert!(validate_raw_data(&data).is_ok());
}

#[test]
fn test_validation_failure_empty_machine() {
    let data = RawSensorData {
        machine_id: "".to_string(),
        parameter: "temperature".to_string(),
        value: 25.5,
        unit: Some("C".to_string()),
    };
    assert!(validate_raw_data(&data).is_err());
}

#[test]
fn test_validation_failure_range() {
    let data = RawSensorData {
        machine_id: "MACHINE-01".to_string(),
        parameter: "temperature".to_string(),
        value: 600.0,
        unit: Some("C".to_string()),
    };
    let result = validate_raw_data(&data);
    assert!(result.is_err());
    assert_eq!(result.unwrap_err().to_string(), "Temperature out of range: 600");
}
