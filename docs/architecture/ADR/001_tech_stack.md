# Architecture Decision Records (ADR)

## ADR 001: Core Technology Stack
**Status:** Accepted
**Date:** 2026-05-31

### Context
The platform needs to handle high-frequency data ingestion (50k pts/sec) while providing a real-time dashboard for factory operators.

### Decision
- **Ingestion**: Rust (Tokio + RDkafka) for memory safety and throughput.
- **Analytics**: C++17 for performance-critical OEE and SPC calculations.
- **Database**: TimescaleDB for time-series data; PostgreSQL for master data.
- **Frontend**: React (TypeScript) with Vanilla CSS for maximum performance and interactive SVG floor maps.

### Consequences
- High development velocity for UI.
- Deterministic performance for data processing.
- Robust time-series querying capabilities.
