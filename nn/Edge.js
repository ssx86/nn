class Edge {
  network;
  left;
  right;
  w;
  constructor(network, left, right, w) {
    this.network = network
    this.left = left;
    this.right = right;
    this.w = w;

    left.postEdges.push(this);
    right.prevEdges.push(this);
  }
  static connect(network, left, right, w) {
    return new Edge(network, left, right, w);
  }
}

export default Edge;
