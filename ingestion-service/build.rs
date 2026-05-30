fn main() {
    prost_build::compile_protos(
        &[
            "../shared/proto/sensor_data.proto",
            "../shared/proto/machine_event.proto",
            "../shared/proto/alert.proto",
        ],
        &["../shared/proto/"],
    )
    .unwrap();
}
