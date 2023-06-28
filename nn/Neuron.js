import Node from "./Node.js";
import config from "./config.js";

class Neuron extends Node {
  isOutput = false;

  b;

  activation;

  h;
  sumW = 0;
  dOutput;

  constructor(b, activation = config.default_activation) {
    super();
    this.b = b;
    this.activation = activation;
  }
  propagate() {
    this.h =
      this.prevEdges.reduce((res, edge) => {
        const result = res + edge.left.output * edge.w;
        return result;
      }, 0) + this.b;
    // this.output = this.isOutput ? this.h : this.activation.activate(this.h);
    this.output = this.activation.activate(this.h);
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

    this.dh = this.activation.der(this.h) * this.dOutput;

    const db = -1 * config.learning_rate * this.dh;
    this.b += db;

    this.sumW = 0;
    this.prevEdges.forEach((edge) => {
      const dw =
        -1 *
        config.learning_rate *
        (this.dh * edge.left.output + edge.w * config.lambda);
      edge.w += dw;
      this.sumW += edge.w;
    });
  }

  fetchParam(batchAcc) {
    batchAcc.setBias(this, this.b);
    this.prevEdges.forEach((edge) => {
      batchAcc.setWeight(edge, edge.w);
    });
  }

  updateParam(batchAcc) {
    this.b = batchAcc.getBias(this);
    this.prevEdges.forEach((edge) => {
      edge.w = batchAcc.getWeight(edge);
    });
  }
}

export default Neuron;
