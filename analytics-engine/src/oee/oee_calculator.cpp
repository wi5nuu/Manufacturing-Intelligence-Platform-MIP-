#include "oee/oee_calculator.hpp"
#include <algorithm>

namespace mip::analytics {

OeeResult OeeCalculator::calculate(
    int planned_time_min,
    int actual_run_min,
    int total_units,
    int good_units,
    double ideal_cycle_time_s
) {
    OeeResult result = {0.0, 0.0, 0.0, 0.0};

    if (planned_time_min > 0) {
        result.availability = (double)actual_run_min / planned_time_min;
    }

    if (actual_run_min > 0) {
        double actual_run_s = actual_run_min * 60.0;
        result.performance = (ideal_cycle_time_s * total_units) / actual_run_s;
    }

    if (total_units > 0) {
        result.quality = (double)good_units / total_units;
    }

    // Clamp values between 0 and 1
    result.availability = std::clamp(result.availability, 0.0, 1.0);
    result.performance = std::clamp(result.performance, 0.0, 1.0);
    result.quality = std::clamp(result.quality, 0.0, 1.0);

    result.oee = result.availability * result.performance * result.quality;

    return result;
}

} // namespace mip::analytics
