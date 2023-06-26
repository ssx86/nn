class BatchAcc {
  map = new Map();

  bestLoss = null;

  setLoss(loss) {
    this.bestLoss = loss;
  }

  better(loss) {
    if (this.bestLoss == null) {
      return true;
    } else {
      return loss < this.bestLoss;
    }
  }

  clear() {
    this.map.clear();
    this.bestLoss = null;
  }

  getNeuronKey(neuron) {
    return `b_${neuron.__id}`;
  }

  getEdgeKey(edge) {
    return `w_${edge.left.__id}_${edge.right.__id}`;
  }

  setWeight(edge, value) {
    const key = this.getEdgeKey(edge);
    this.map.set(key, value);
  }
  setBias(neuron, value) {
    const key = this.getNeuronKey(neuron);
    this.map.set(key, value);
  }

  getWeight(edge) {
    const key = this.getEdgeKey(edge);
    return this.map.get(key);
  }

  getBias(neuron) {
    const key = this.getNeuronKey(neuron);
    return this.map.get(key);
  }
}

export default BatchAcc;
