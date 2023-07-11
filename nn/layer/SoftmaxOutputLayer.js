import Activation from "../Activation.js";
import config from "../config.js";
import LayerBase from "./LayerBase.js";

class SoftmaxOutputLayer extends LayerBase {
  activation = Activation.softmax;

  buildLayer(count, preLayer) {
    for (let i = 0; i < count; i++) {
      const node = new Neuron(
        this,
        Math.random() / 10 - 0.05,
        this.activation
      );
      node.isOutput = true;
      this.neurons.push(node);
    }
    this.fullConnect(preLayer)
  }

  propagate() {
    this.neurons.forEach((n) => {
      n.propagate();
    });
    // loss is stored in the network
    const outputs = Activation.softmax.activate(this.nodes().map((x) => x.h));
    this.nodes().forEach((n, i) => {
      n.output = outputs[i];
    });
  }
  backward() {
    const jacobian = this.activation.der(this.nodes().map(x => x.dOutput))
    for (let i = 0; i < jacobian.length; i++) {
      this.neurons[i].dh = 0
      for (let j = 0; j < jacobian[i].length; j++) {
        this.neurons[i].dh += this.neurons[j].dOutput * jacobian[i][j]
      }
    }

    this.neurons.forEach((n) => {
      n.backward();
    });
  }
}
export default SoftmaxOutputLayer;
