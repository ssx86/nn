import Activation from "./Activation.js";
import config from "./config.js";

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
      const outputs = Activation.softmax.activate(this.nodes().map((x) => x.h));
      this.nodes().forEach((n, i) => {
        n.output = outputs[i];
      });
    }
  }
  backward() {
    // softmax层需要整体求梯度
    if (this.isOutput && this.activation == Activation.softmax) {
      const jacobian = this.activation.der(this.nodes().map(x => x.dOutput))


      for (let i = 0; i < jacobian.length; i++) {
        this.neurons[i].dh = 0
        for (let j = 0; j < jacobian[i].length; j++) {
          this.neurons[i].dh += this.neurons[j].dOutput * jacobian[i][j]
        }
      }

    }

    this.neurons.forEach((n) => {
      n.backward();
    });
  }
}
export default Layer;
