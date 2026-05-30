pub mod adapters;
pub mod pipeline;
pub mod kafka;

pub mod proto {
    include!(concat!(env!("OUT_DIR"), "/mip.shared.rs"));
}
