import Feature from "../Feature.js";
import LayerBase from "./LayerBase.js";

class InputLayer extends LayerBase {
  activation;

  buildLayer(featureFns) {
    this.neurons = featureFns.map((fn, index) => {
      const node = new Feature(this, fn);
      node.name = `Feature ${index}`;
      return node;
    })
  }

  propagate(input) {
    this.neurons.forEach((n) => {
      n.propagate(input)
    });
  }

  backward() { }
}
export default InputLayer;
