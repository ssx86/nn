import Neuron from "../Neuron.js";
import config from "../config.js";
import LayerBase from "./LayerBase.js";

class FullConnectLayer extends LayerBase {
  buildLayer(count, preLayer) {
    for (let i = 0; i < count; i++) {
      const node = new Neuron(
        this,
        Math.random() / 10 - 0.05,
        this.option.activation || config.default_activation
      );
      this.neurons.push(node);
    }
    this.fullConnect(preLayer);
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
export default FullConnectLayer;
