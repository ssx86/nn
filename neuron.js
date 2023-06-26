import Node from "./Node.js";
import { sigmoid, dSigmoid, relu, dRelu, learning_rate } from "./utils.js";

class Neuron extends Node {
  d;
  dh;
  b;
  h;
  activeFn;

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
    this.value = this.activeFn(this.h);
  }
  backward() {
    if (this.postEdges.length !== 0) {
      // not output node
      let d = 0;
      const current = this;

      this.postEdges
        .map((edge) => edge.right)
        .forEach((node) => {
          let sumW = 0,
            w;
          node.prevEdges.forEach((edge) => {
            if (edge.left == current) w = edge.w;
            sumW += edge.w;
          });
          if (sumW !== 0) d += (node.dh * w) / sumW;
          else d += node.dh / node.prevEdges.length;
        });

      this.d = d;
    }
    const dz = this.dFn(this.d);
    this.b -= learning_rate * this.d * dz;
    this.prevEdges.forEach((edge) => {
      edge.w -= learning_rate * this.d * dz * edge.left.value;
    });
    this.dh = this.d * dz;
  }
}

export default Neuron;
