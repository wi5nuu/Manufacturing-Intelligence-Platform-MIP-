#pragma once
#include <string>

namespace mip::analytics {

class TimescaleWriter {
public:
    TimescaleWriter(const std::string& connection_string);
    bool write_reading(const std::string& machine_id, const std::string& parameter, double value);
private:
    std::string conn_str;
};

class PostgresWriter {
public:
    PostgresWriter(const std::string& connection_string);
    bool log_event(const std::string& machine_id, const std::string& event_type, const std::string& details);
private:
    std::string conn_str;
};

} // namespace mip::analytics
