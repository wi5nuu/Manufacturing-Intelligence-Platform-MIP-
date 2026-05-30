-- 001_initial_timeseries.sql
-- TimescaleDB Initial Schema

-- Extensions
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- Semua raw sensor data
CREATE TABLE sensor_readings (
  time          TIMESTAMPTZ NOT NULL,
  machine_id    UUID NOT NULL,
  parameter     TEXT NOT NULL,      -- 'temperature', 'vibration', 'speed', dll
  value         DOUBLE PRECISION NOT NULL,
  unit          TEXT,
  quality       SMALLINT DEFAULT 100  -- 0-100, data quality score
);
SELECT create_hypertable('sensor_readings', 'time', chunk_time_interval => INTERVAL '1 day');
CREATE INDEX ON sensor_readings (machine_id, time DESC);

-- OEE aggregated per jam
CREATE TABLE oee_hourly (
  time              TIMESTAMPTZ NOT NULL,
  machine_id        UUID NOT NULL,
  shift_id          UUID,
  availability      NUMERIC(5,2),   -- 0.00 - 100.00
  performance       NUMERIC(5,2),
  quality           NUMERIC(5,2),
  oee               NUMERIC(5,2),
  planned_time_min  INTEGER,
  actual_run_min    INTEGER,
  units_produced    INTEGER,
  units_good        INTEGER
);
SELECT create_hypertable('oee_hourly', 'time');
CREATE INDEX ON oee_hourly (machine_id, time DESC);

-- Machine events (start, stop, fault, maintenance)
CREATE TABLE machine_events (
  time        TIMESTAMPTZ NOT NULL,
  machine_id  UUID NOT NULL,
  event_type  TEXT NOT NULL,      -- 'start', 'stop', 'fault', 'maintenance', 'changeover'
  event_code  TEXT,
  duration_s  INTEGER,
  operator_id UUID,
  notes       TEXT
);
SELECT create_hypertable('machine_events', 'time');
CREATE INDEX ON machine_events (machine_id, time DESC);
