use axum::{
    routing::post,
    Router,
    Json,
};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub token: String,
    pub user: UserInfo,
}

#[derive(Serialize)]
pub struct UserInfo {
    pub id: String,
    pub name: String,
    pub role: String,
}

pub fn auth_routes() -> Router {
    Router::new()
        .route("/login", post(login))
}

async fn login(Json(payload): Json<LoginRequest>) -> Json<Value> {
    // In Fase 2, we still use mock auth logic but with proper structures
    if payload.email == "admin@mip.com" && payload.password == "admin123" {
        Json(json!({
            "token": "mock-jwt-token-fase-2",
            "user": {
                "id": "admin-uuid",
                "name": "Principal Engineer",
                "role": "admin"
            }
        }))
    } else {
        Json(json!({ "error": "Invalid credentials" }))
    }
}
