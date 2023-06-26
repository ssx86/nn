import Node from "./Node.js";
import { sigmoid, dSigmoid, relu, dRelu, config } from "./utils.js";

class Neuron extends Node {
  isOutput = false;

  b;

  activeFn;
  dFn;

  h;
  sumW = 0;
  dOutput;

  constructor(b, activeFn = relu, dFn = dRelu) {
    super();
    this.b = b;
    this.activeFn = activeFn;
    this.dFn = dFn;
  }
  propagate() {
    this.h =
      this.prevEdges.reduce((res, edge) => {
        const result = res + edge.left.value * edge.w;
        return result;
      }, 0) + this.b;
    this.value = this.isOutput ? this.h : this.activeFn(this.h);
  }
  backward() {
    if (!this.isOutput) {
      this.dOutput = 0;
      this.postEdges.forEach((edge) => {
        if (edge.right.sumW == 0) {
          this.dOutput += edge.right.dh / edge.right.prevEdges.length;
        } else {
          this.dOutput += (edge.w * edge.right.dh) / edge.right.sumW;
        }
      });
      if (this.dOutput == 0) {
        debugger;
      }
    }

    this.dh = this.isOutput ? this.dOutput : this.dFn(this.h) * this.dOutput;

    this.b -= config.learning_rate * this.dh;

    this.sumW = 0;
    this.prevEdges.forEach((edge) => {
      let dw = config.learning_rate * this.dh * edge.left.value;
      const rate = Math.abs(dw) / Math.abs(edge.w);
      // if (rate > 1) dw /= rate;
      edge.w -= dw;
      this.sumW += edge.w;
    });
  }
}

export default Neuron;
