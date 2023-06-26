import Node from "./Node.js";
import { relu, learning_rate } from "./utils.js";

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
    this.b -= learning_rate * this.d;
    this.prevEdges.forEach((edge) => {
      edge.w -= learning_rate * this.d * edge.left.value;
    });
    this.dh = this.d;
  }
}

export default OutputNode;
