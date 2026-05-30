import onnx
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType

def export_to_onnx(model, output_path):
    initial_type = [('float_input', FloatTensorType([None, 1]))]
    onx = convert_sklearn(model, initial_types=initial_type)
    
    with open(output_path, "wb") as f:
        f.write(onx.SerializeToString())
    print(f"Model exported to {output_path}")

if __name__ == "__main__":
    # Example export
    # export_to_onnx(trained_model, "models/anomaly_detector.onnx")
    print("Export script ready.")
    pass
