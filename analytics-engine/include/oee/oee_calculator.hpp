#pragma once

namespace mip::analytics {

struct OeeResult {
    double availability;
    double performance;
    double quality;
    double oee;
};

class OeeCalculator {
public:
    OeeResult calculate(
        int planned_time_min,
        int actual_run_min,
        int total_units,
        int good_units,
        double ideal_cycle_time_s
    );
};

} // namespace mip::analytics
