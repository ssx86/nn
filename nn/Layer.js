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
    this.neurons.forEach((n) => {
      this.isFeature ? n.propagate(input) : n.propagate();
    });
    if (this.activation == Activation.softmax) {
      // loss is stored in the network
      const outputs = Activation.softmax.activate(this.neurons.map((x) => x.h));
      this.neurons.forEach((n, i) => {
        n.output = outputs[i];
      });
    }
  }
  backward() {
    if (this.isOutput && this.activation == Activation.softmax) {
      this.neurons.forEach((x) => (x.dOutput = 1));
    }
    this.neurons.forEach((n) => {
      n.backward();
    });
  }
}
export default Layer;
