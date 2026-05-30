-- 001_initial_master_data.sql
-- PostgreSQL Initial Schema for Master Data

-- Production Lines
CREATE TABLE production_lines (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  unit        TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Machines
CREATE TABLE machines (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT UNIQUE NOT NULL,    -- 'LINE-A-PRESS-01'
  name            TEXT NOT NULL,
  line_id         UUID REFERENCES production_lines(id),
  machine_type    TEXT NOT NULL,
  manufacturer    TEXT,
  model           TEXT,
  serial_number   TEXT UNIQUE,
  installation_date DATE,
  nominal_capacity INTEGER,               -- units per hour
  is_active       BOOLEAN DEFAULT TRUE,
  parameters      JSONB,                  -- konfigurasi parameter sensor
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Shift definitions
CREATE TABLE shifts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,             -- 'Shift Pagi', 'Shift Sore', 'Shift Malam'
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  is_overnight BOOLEAN DEFAULT FALSE
);

-- Users dengan RBAC
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('operator','supervisor','manager','executive','admin')),
  department    TEXT,
  line_ids      UUID[],                  -- null = akses semua lini
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Production orders
CREATE TABLE production_orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number    TEXT UNIQUE NOT NULL,
  product_id      UUID REFERENCES products(id),
  target_quantity INTEGER NOT NULL,
  actual_quantity INTEGER DEFAULT 0,
  status          TEXT DEFAULT 'pending',
  scheduled_start TIMESTAMPTZ,
  scheduled_end   TIMESTAMPTZ,
  actual_start    TIMESTAMPTZ,
  actual_end      TIMESTAMPTZ,
  line_id         UUID REFERENCES production_lines(id)
);

-- Alerts
CREATE TABLE alerts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id      UUID REFERENCES machines(id),
  severity        TEXT NOT NULL CHECK (severity IN ('critical','high','medium','low','info')),
  category        TEXT NOT NULL,          -- 'anomaly', 'maintenance', 'quality', 'sla'
  title           TEXT NOT NULL,
  description     TEXT,
  root_cause      TEXT,                   -- AI-generated suggestion
  recommended_action TEXT,
  triggered_at    TIMESTAMPTZ DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES users(id),
  resolved_at     TIMESTAMPTZ,
  resolved_by     UUID REFERENCES users(id),
  is_active       BOOLEAN DEFAULT TRUE
);

-- Quality inspections
CREATE TABLE quality_inspections (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  time            TIMESTAMPTZ DEFAULT NOW(),
  order_id        UUID REFERENCES production_orders(id),
  machine_id      UUID REFERENCES machines(id),
  inspector_id    UUID REFERENCES users(id),
  sample_size     INTEGER,
  defect_count    INTEGER DEFAULT 0,
  defect_types    JSONB,                  -- {"scratch": 3, "dimension": 1}
  measurements    JSONB,                  -- parameter aktual vs spec
  result          TEXT CHECK (result IN ('pass','fail','conditional')),
  notes           TEXT
);

-- Maintenance work orders
CREATE TABLE work_orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id      UUID REFERENCES machines(id),
  type            TEXT NOT NULL CHECK (type IN ('preventive','corrective','predictive')),
  priority        TEXT DEFAULT 'medium',
  title           TEXT NOT NULL,
  description     TEXT,
  assigned_to     UUID REFERENCES users(id),
  status          TEXT DEFAULT 'open',
  scheduled_date  DATE,
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  downtime_min    INTEGER,
  parts_used      JSONB,
  labor_hours     NUMERIC(6,2),
  root_cause      TEXT,
  actions_taken   TEXT
);

-- Indexes for performance
CREATE INDEX idx_machines_line_id ON machines(line_id);
CREATE INDEX idx_alerts_machine_id ON alerts(machine_id);
CREATE INDEX idx_alerts_is_active ON alerts(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_production_orders_status ON production_orders(status);
CREATE INDEX idx_quality_inspections_order_id ON quality_inspections(order_id);
CREATE INDEX idx_work_orders_machine_id ON work_orders(machine_id);
CREATE INDEX idx_work_orders_status ON work_orders(status);
