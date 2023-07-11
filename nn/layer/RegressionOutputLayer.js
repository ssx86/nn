import Activation from "../Activation.js";
import Neuron from "../Neuron.js";
import config from "../config.js";
import LayerBase from "./LayerBase.js";

class RegressionOutputLayer extends LayerBase {
  activation = Activation.leakyRelu

  buildLayer(preLayer) {
    const node = new Neuron(
      this,
      Math.random() / 10 - 0.05,
      this.option.activation || config.default_output_activation
    );
    node.isOutput = true;
    this.neurons.push(node);
    this.fullConnect(preLayer)
  }

  propagate() {
    this.neurons.forEach((n) => {
      n.propagate();
    });
  }

  backward() {
    this.neurons.forEach((n) => {
      n.backward();
    });
  }

}
export default RegressionOutputLayer;
