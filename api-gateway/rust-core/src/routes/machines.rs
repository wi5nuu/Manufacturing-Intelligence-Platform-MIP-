use axum::{
    routing::get,
    Router,
    Json,
};
use serde_json::{json, Value};

pub fn machine_routes() -> Router {
    Router::new()
        .route("/", get(list_machines))
        .route("/:id", get(get_machine))
        .route("/:id/status", get(get_machine_status))
}

async fn list_machines() -> Json<Value> {
    Json(json!([
        { "id": "uuid1", "code": "LINE-A-PRESS-01", "status": "running" },
        { "id": "uuid2", "code": "LINE-A-CNC-02", "status": "warning" }
    ]))
}

async fn get_machine(axum::extract::Path(id): axum::extract::Path(String)) -> Json<Value> {
    Json(json!({ "id": id, "code": "LINE-A-PRESS-01", "type": "Press", "status": "running" }))
}

async fn get_machine_status(axum::extract::Path(id): axum::extract::Path(String)) -> Json<Value> {
    Json(json!({ "id": id, "status": "running", "load": 85.5 }))
}
