# Manufacturing Intelligence Platform (MIP)

MIP is a central factory nervous system designed for large-scale manufacturing environments. It automates data collection from sensors, machines, and ERP systems to provide real-time visibility, OEE analytics, and predictive maintenance insights.

## 🚀 Key Features

- **High-Frequency Ingestion**: Rust-based service handling up to 50,000 data points/sec.
- **Advanced Analytics**: C++ engine for real-time OEE, SPC, and Anomaly Detection.
- **Interactive Dashboard**: React-based UI with SVG floor maps and live ECharts.
- **Real-time Alerts**: Automated anomaly detection and escalation system.
- **Predictive Maintenance**: RUL estimation and health scoring for critical assets.

## 🛠 Tech Stack

- **Backend**: Rust (Axum, Tokio), C++17
- **Frontend**: React 18, TypeScript, Vanilla CSS
- **Data Pipeline**: Apache Kafka, TimescaleDB, PostgreSQL
- **AI/ML**: Python (Training), ONNX Runtime (Inference in C++)
- **Infrastructure**: Docker, Kubernetes, Prometheus, Grafana

## 📁 Project Structure

```text
mip-platform/
├── ingestion-service/    # Rust: Data ingestion pipeline
├── analytics-engine/     # C++: Core OEE/SPC analytics
├── api-gateway/          # Rust: API and WebSocket server
├── dashboard/            # React: Frontend application
├── ml-pipeline/          # Python: Anomaly detection training
├── shared/               # Protobuf and JSON schemas
├── infra/                # Docker, K8s, and monitoring config
└── docs/                 # API specs and architecture records
```

## 🚥 Quick Start

1. **Start Infrastructure**:
   ```bash
   docker-compose -f infra/docker/docker-compose.dev.yml up -d
   ```

2. **Run Ingestion Service**:
   ```bash
   cd ingestion-service && cargo run
   ```

3. **Run API Gateway**:
   ```bash
   cd api-gateway/rust-core && cargo run
   ```

4. **Start Dashboard**:
   ```bash
   cd dashboard && npm install && npm run dev
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
