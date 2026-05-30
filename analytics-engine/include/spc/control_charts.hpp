#pragma once
#include <vector>

namespace mip::analytics {

struct SpcDataPoint {
    double value;
    long long timestamp;
};

struct SpcResult {
    double mean;
    double ucl; // Upper Control Limit
    double lcl; // Lower Control Limit
    bool out_of_control;
};

class SpcCalculator {
public:
    SpcResult calculate_xbar(const std::vector<double>& samples);
};

} // namespace mip::analytics
