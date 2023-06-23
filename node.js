class Node {
  static uuid = 0;

  __id;
  constructor() {
    Node.uuid += 1;
    this.__id = Node.uuid;
  }
  value;
  prevEdges = [];
  postEdges = [];
  propagate() {}
  backward() {
    console.log("backward, ", this.constructor.name, this.__id);

    this.prevEdges.forEach((edge) => {
      edge.left.backward();
    });
  }
}

export default Node;
