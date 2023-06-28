import Activation from "./Activation.js";

class Layer {
  isOutput = false;
  isFeature = false;
  neurons = [];
  activation;

  constructor(nodes) {
    this.neurons = nodes;
  }

  nodes() {
    return this.neurons;
  }

  propagate(input) {
    if (this.activation == Activation.softmax) {
      // loss is stored in the network
      const outputs = Activation.softmax.activate(this.neurons.map((x) => x.h));
      this.neurons.forEach((n, i) => {
        n.output = outputs[i];
      });
    }
    this.neurons.forEach((n) => {
      this.isFeature ? n.propagate(input) : n.propagate();
    });
  }
  backward() {
    this.neurons.forEach((n) => {
      n.backward();
    });
  }
}
export default Layer;
