# Manufacturing Intelligence Platform (MIP)

## Overview
The Manufacturing Intelligence Platform (MIP) is an enterprise-grade solution designed to serve as the central nervous system for large-scale manufacturing environments. The platform addresses critical industrial challenges such as data silos, lack of real-time visibility, and unmeasured operational efficiency. By integrating data from IoT sensors, PLC/SCADA systems, and ERP layers, MIP provides actionable insights through real-time OEE analytics, Statistical Process Control (SPC), and predictive maintenance modeling.

## System Architecture
MIP employs a high-performance, distributed architecture designed for low latency and high availability.

### Data Flow Model
1. **Edge Layer**: Data acquisition from sensors and machines via MQTT, OPC-UA, and Modbus.
2. **Ingestion Layer (Rust)**: High-throughput validation and normalization, streaming data to Apache Kafka.
3. **Analytics Layer (C++)**: Real-time processing of OEE metrics, SPC charts, and anomaly detection via ONNX inference.
4. **Persistence Layer**: Time-series metrics stored in TimescaleDB; master data and events in PostgreSQL.
5. **API Gateway (Rust/tRPC)**: Unified interface for REST, tRPC, and real-time WebSocket communication.
6. **Presentation Layer (React)**: Interactive dashboard featuring SVG-based floor maps and dynamic performance gauges.

## Core Modules

### 1. Executive Analytics
Comprehensive KPI tracking including real-time OEE, production vs. target analysis, and facility-wide performance benchmarks.

### 2. Production Floor Map
Interactive, SVG-based visualization of the production floor, providing live status updates for individual machines and production lines.

### 3. Quality Control (SPC)
Implementation of Statistical Process Control using Shewhart control charts (X-bar, R-charts) and capability indices (Cp, Cpk) to detect process deviations.

### 4. Alert & Escalation Center
A centralized hub for anomaly detection alerts, predictive maintenance warnings, and automated escalation workflows.

### 5. Predictive Maintenance
Machine health scoring and Remaining Useful Life (RUL) estimation based on vibration, temperature, and operational load data.

## Technology Stack

### Backend & Analytics
- **Rust**: Utilized for the ingestion service and API gateway to ensure memory safety and high concurrency without garbage collection overhead.
- **C++17**: Employed for the analytics engine to leverage deterministic performance and advanced numerical libraries.
- **Python**: Used for offline machine learning model training and feature engineering.

### Data & Infrastructure
- **TimescaleDB**: Optimized PostgreSQL extension for time-series data storage and complex analytical queries.
- **Apache Kafka**: Distributed event streaming platform for fault-tolerant data pipelines.
- **Redis Cluster**: High-speed caching and real-time pub/sub messaging.
- **OpenTelemetry**: Standardized distributed tracing and observability across all services.

### Frontend
- **React 18 & TypeScript**: Ensures a robust, type-safe user interface with modular component architecture.
- **Apache ECharts**: High-performance charting library for complex industrial data visualization.

## Performance and Security Standards

### Performance Benchmarks
- **Ingestion Throughput**: 50,000 data points per second sustained.
- **API Latency**: P99 < 50ms for dashboard queries.
- **Live Data Update**: < 2 seconds from sensor acquisition to UI rendering.

### Security Mandates
- **Zero-Trust Architecture**: Mandatory verification for all service-to-service communication.
- **Encryption**: TLS 1.3 for data in transit; AES-256 for sensitive data at rest.
- **RBAC**: Granular Role-Based Access Control across five distinct user tiers.
- **Audit Trail**: Immutable logging of all administrative and configuration changes.

## Installation and Deployment

### Prerequisites
- Docker and Docker Compose
- Rust Toolchain (Stable)
- C++17 Compatible Compiler (GCC/Clang)
- Node.js 18+

### Local Development Setup
1. **Infrastructure Initialization**:
   ```bash
   make infra-up
   ```
2. **Backend Services**:
   - Ingestion: `make ingestion-run`
   - API Gateway: `make api-run`
3. **Frontend Dashboard**:
   - `make dashboard-dev`

## Project Roadmap

### Phase 1: Foundation (Completed)
- Monorepo structure and containerized infrastructure setup.
- Core database schemas and shared Protobuf definitions.
- Initial ingestion and API gateway scaffolding.

### Phase 2: Core Features (In Progress)
- Modular refactoring of analytics and routing logic.
- Implementation of interactive floor maps and real-time OEE gauges.
- Integration of the primary Kafka data pipeline.

### Phase 3: Advanced Analytics
- ONNX-based anomaly detection deployment.
- Predictive maintenance health scoring.
- Automated shift and OEE report generation.

### Phase 4: Production Readiness
- Kubernetes orchestration and Helm chart development.
- Full Prometheus/Grafana monitoring suite.
- Load testing and throughput optimization.

## Contributing
Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for detailed information on our development workflow and coding standards.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for the full text.
