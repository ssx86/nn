import Node from "./Node.js";
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
  backward() {
    const z = this.value > 0 ? this.value : 0;
    if (z == 0) {
      return;
    }
    super.backward();
  }
}

export default Neuron;
