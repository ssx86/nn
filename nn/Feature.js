import Node from "./Node.js";

class Feature extends Node {
  network;
  fn;

  constructor(network, fn) {
    super();
    this.network = network
    this.fn = fn;
  }
  propagate(val) {
    this.output = this.fn(val);
  }
}

export default Feature;
