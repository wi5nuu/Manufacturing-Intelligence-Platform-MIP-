use axum::{
    routing::get,
    Router,
    Json,
};
use serde_json::{json, Value};

pub fn analytics_routes() -> Router {
    Router::new()
        .route("/oee/summary", get(oee_summary))
        .route("/oee/trend", get(oee_trend))
}

async fn oee_summary() -> Json<Value> {
    Json(json!({
        "oee": 78.5,
        "availability": 85.0,
        "performance": 95.0,
        "quality": 97.0
    }))
}

async fn oee_trend() -> Json<Value> {
    Json(json!([
        { "time": "2026-05-31T00:00:00Z", "oee": 75.0 },
        { "time": "2026-05-31T01:00:00Z", "oee": 78.5 }
    ]))
}
