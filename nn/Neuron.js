import Activation from "./Activation.js";
import Node from "./Node.js";
import config from "./config.js";

class Neuron extends Node {
  network
  isOutput = false;

  b;

  activation;

  h;
  sumW = 0;
  dOutput;

  constructor(network, b, activation = config.default_activation) {
    super();
    this.network = network
    this.b = b;
    this.activation = activation;
  }
  propagate() {
    this.h =
      this.prevEdges.reduce((res, edge) => {
        const result = res + edge.left.output * edge.w;
        return result;
      }, 0) + this.b;
    if (!(this.isOutput && this.activation == Activation.softmax)) {
      // softmax层无需激活，等待输出层统一激活
      this.output = this.activation.activate(this.h);
    }
  }
  backward() {
    if (this.isOutput) {
    } else {
      this.dOutput = 0;
      this.postEdges.forEach((edge) => {
        if (edge.right.sumW == 0) {
          this.dOutput += edge.right.dh / edge.right.prevEdges.length;
        } else {
          this.dOutput += (edge.w * edge.right.dh) / edge.right.sumW;
        }
      });
    }
    if (!(this.isOutput && this.activation == Activation.softmax)) {
      this.dh = this.activation.der(this.h) * this.dOutput;
    } else {
      // this.dh会在layer中计算好
    }

    const db = -1 * this.network.realtimeLearningRate() * this.dh;
    this.b += db;

    this.sumW = 0;
    this.prevEdges.forEach((edge) => {
      const dw =
        -1 *
        this.network.realtimeLearningRate() *
        (this.dh * edge.left.output + edge.w * config.lambda);
      edge.w += dw;
      this.sumW += edge.w;
    });
  }

}

export default Neuron;
