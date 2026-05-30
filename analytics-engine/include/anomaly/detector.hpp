#pragma once
#include <string>
#include <vector>

namespace mip::analytics {

struct AnomalyResult {
    bool is_anomaly;
    double confidence;
    std::string severity;
};

class AnomalyDetector {
public:
    AnomalyDetector(const std::string& model_path);
    AnomalyResult detect(const std::vector<double>& features);
private:
    std::string model_file;
};

} // namespace mip::analytics
