import Node from "./node.js";

class Feature extends Node {
  fn;
  constructor(fn) {
    super();
    this.fn = fn;
  }
  input(val) {
    this.value = this.fn(val);
  }
}

export default Feature;
