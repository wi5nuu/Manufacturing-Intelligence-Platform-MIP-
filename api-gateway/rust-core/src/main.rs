use axum::{
    routing::get,
    extract::ws::{WebSocketUpgrade, WebSocket},
    response::IntoResponse,
    Router,
};
use std::net::SocketAddr;
use tracing::{info, Level};
use tracing_subscriber::FmtSubscriber;
use tower_http::cors::CorsLayer;

mod routes;
mod auth;

use crate::routes::machines::machine_routes;
use crate::routes::oee::analytics_routes;
use crate::auth::jwt::auth_routes;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize logging
    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::INFO)
        .finish();
    tracing::subscriber::set_global_default(subscriber)?;

    info!("Manufacturing Intelligence Platform - API Gateway starting...");

    // Build our application with modular routes
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/ws", get(ws_handler))
        .nest("/auth", auth_routes())
        .nest("/api/v1/machines", machine_routes())
        .nest("/api/v1/analytics", analytics_routes())
        .layer(CorsLayer::permissive());

    // Run it
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    info!("Listening on {}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

async fn health_check() -> &'static str {
    "OK"
}

async fn ws_handler(ws: WebSocketUpgrade) -> impl IntoResponse {
    ws.on_upgrade(handle_socket)
}

async fn handle_socket(mut socket: WebSocket) {
    info!("New WebSocket connection established");
    while let Some(msg) = socket.recv().await {
        if let Ok(msg) = msg {
            if let Err(e) = socket.send(msg).await {
                info!("WebSocket send error: {}", e);
                break;
            }
        } else {
            info!("WebSocket client disconnected");
            break;
        }
    }
}
