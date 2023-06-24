import Node from "./Node.js";
import { relu } from "./utils.js";

class OutputNode extends Node {
  d;
  dh;
  b;

  constructor(b) {
    super();
    this.b = b;
  }
  propagate() {
    this.value =
      this.prevEdges.reduce((res, edge) => {
        const result = res + edge.left.value * edge.w;
        return result;
      }, 0) + this.b;
  }
  backward() {
    this.b -= 0.003 * this.d;
    this.prevEdges.forEach((edge) => {
      edge.w -= 0.003 * this.d * edge.left.value;
    });
    this.dh = this.d;
  }
}

export default OutputNode;
