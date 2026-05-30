#include "spc/control_charts.hpp"
#include <numeric>
#include <cmath>
#include <algorithm>

namespace mip::analytics {

SpcResult SpcCalculator::calculate_xbar(const std::vector<double>& samples) {
    if (samples.empty()) return {0.0, 0.0, 0.0, false};

    double sum = std::accumulate(samples.begin(), samples.end(), 0.0);
    double mean = sum / samples.size();

    double sq_sum = std::inner_product(samples.begin(), samples.end(), samples.begin(), 0.0);
    double stdev = std::sqrt(sq_sum / samples.size() - mean * mean);

    // 3-sigma limits
    double ucl = mean + (3 * stdev);
    double lcl = mean - (3 * stdev);

    bool ooc = false;
    if (!samples.empty()) {
        double last = samples.back();
        ooc = (last > ucl || last < lcl);
    }

    return {mean, ucl, lcl, ooc};
}

} // namespace mip::analytics
