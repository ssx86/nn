class Node {
  static uuid = 0;

  __id;
  constructor() {
    Node.uuid += 1;
    this.__id = Node.uuid;
  }
  name;
  output;
  prevEdges = [];
  postEdges = [];
  propagate() {}
}

export default Node;
