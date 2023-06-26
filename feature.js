import Node from "./Node.js";

class Feature extends Node {
  fn;

  constructor(fn) {
    super();

    this.fn = fn;
  }
  propagate(val) {
    this.value = this.fn(val);
  }
}

export default Feature;
