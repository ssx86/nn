import Node from "./Node.js";
import { relu } from "./utils.js";

class Neuron extends Node {
  d;
  dh;
  b;
  activeFn = relu;

  constructor(b, activeFn = relu) {
    super();
    this.b = b;
    this.activeFn = activeFn;
  }
  propagate() {
    this.value =
      this.prevEdges.reduce((res, edge) => {
        const result = res + this.activeFn(edge.left.value * edge.w);
        return result;
      }, 0) + this.b;
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
          else d += node.dh;
        });

      this.d = d;
    }
    const dz = this.value > 0 ? 1 : 0;
    this.b -= 0.003 * this.d * dz;
    this.prevEdges.forEach((edge) => {
      edge.w -= 0.003 * this.d * dz * edge.left.value;
    });
    this.dh = this.d * dz;
  }
}

export default Neuron;
