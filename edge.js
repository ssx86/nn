class Edge {
  left;
  right;
  w;
  constructor(left, right, w) {
    this.left = left;
    this.right = right;
    this.w = w;

    left.postEdges.push(this);
    right.prevEdges.push(this);
  }
  static connect(left, right, w) {
    return new Edge(left, right, w);
  }
}

export default Edge;
