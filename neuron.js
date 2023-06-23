import Node from "./node.js";
import { relu } from "./utils.js";

class Neuron extends Node {
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
}

export default Neuron;
