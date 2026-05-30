#include "db/db_writers.hpp"
#include <iostream>

namespace mip::analytics {

TimescaleWriter::TimescaleWriter(const std::string& connection_string) : conn_str(connection_string) {}

bool TimescaleWriter::write_reading(const std::string& machine_id, const std::string& parameter, double value) {
    // In Fase 2, we simulate the SQL execution
    std::cout << "[TimescaleDB] Writing reading: " << machine_id << "/" << parameter << " = " << value << std::endl;
    return true;
}

PostgresWriter::PostgresWriter(const std::string& connection_string) : conn_str(connection_string) {}

bool PostgresWriter::log_event(const std::string& machine_id, const std::string& event_type, const std::string& details) {
    std::cout << "[PostgreSQL] Logging event: " << machine_id << " [" << event_type << "] " << details << std::endl;
    return true;
}

} // namespace mip::analytics
