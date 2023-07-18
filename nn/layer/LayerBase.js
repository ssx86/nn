import Edge from "../Edge.js";

class LayerBase {
  network
  option

  neurons = [];

  constructor(network, option) {
    this.network = network
    this.option = option;
  }

  buildLayer() { }

  fullConnect(preLayer) {
    for (const left of preLayer.nodes()) {
      for (const right of this.nodes()) {
        this.network.edges.push(Edge.connect(this.network, left, right, Math.random() / 10));
      }
    }
  }

  connectNode(left, right) {
    this.network.edges.push(Edge.connect(this.network, left, right, Math.random() / 10));
  }

  nodes() {
    return this.neurons;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  propagate() { }
  backward() { }
}

export default LayerBase;
