class ConNode {
  static uuid = 0;
  __id;

  data;
  kernel;
  w;
  b;
  prevNode;

  constructor(prevNode, kernel) {
    ConNode.uuid += 1;
    this.__id = ConNode.uuid;

    this.kernel = kernel;
    this.prevNode = prevNode;
  }
}

export default ConNode;