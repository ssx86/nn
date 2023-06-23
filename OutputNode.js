import Node from "./Node.js";

class OutputNode extends Node {
  constructor() {
    super();
  }
  propagate() {
    this.value = this.prevEdges.reduce((res, edge) => {
      const result = res + edge.left.value * edge.w;
      return result;
    }, 0);
    console.log("output, do nothing");
  }
  backward() {
    super.backward();
  }
}

export default OutputNode;
