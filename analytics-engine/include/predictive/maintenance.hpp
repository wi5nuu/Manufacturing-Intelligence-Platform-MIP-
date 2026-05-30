#pragma once
#include <string>

namespace mip::analytics {

struct MaintenanceScore {
    double health_index; // 0-100
    int days_to_failure;
    std::string recommendation;
};

class PredictiveMaintenance {
public:
    MaintenanceScore analyze(const std::string& machine_id, double current_vibration, double current_temp);
};

} // namespace mip::analytics
