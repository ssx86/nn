import Activation from "../Activation.js";
import LayerBase from "./LayerBase.js";

class ConvolutionLayer extends LayerBase {
  network
  isOutput = false;
  isFeature = false;
  neurons = [];
  activation;

  constructor(network, nodes) {
    this.network = network
    if (nodes)
      this.neurons = nodes;
  }

  nodes() {
    return this.neurons;
  }

  propagate() {
  }
  backward() {

  }
}
export default ConvolutionLayer;
