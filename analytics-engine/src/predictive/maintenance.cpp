#include "predictive/maintenance.hpp"

namespace mip::analytics {

MaintenanceScore PredictiveMaintenance::analyze(const std::string& machine_id, double current_vibration, double current_temp) {
    double health = 100.0;
    
    // Simple heuristic for demo
    if (current_vibration > 10.0) health -= 20.0;
    if (current_temp > 80.0) health -= 15.0;
    
    int rttf = (int)(health / 2.0); // Rough "remaining time to failure" estimation
    
    std::string rec = "Normal operation";
    if (health < 70.0) rec = "Schedule inspection within 7 days";
    if (health < 40.0) rec = "URGENT: Maintenance required";

    return {health, rttf, rec};
}

} // namespace mip::analytics
