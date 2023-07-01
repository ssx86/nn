class BatchAcc {
  map = new Map();

  bestLoss = null;

  setLoss(loss) {
    this.bestLoss = loss;
  }

  hasMoreLossThan(loss) {
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

  saveWeight(edge) {
    const key = this.getEdgeKey(edge);
    this.map.set(key, edge.w);
  }
  saveBias(neuron) {
    const key = this.getNeuronKey(neuron);
    this.map.set(key, neuron.b);
  }

  loadWeight(edge) {
    const key = this.getEdgeKey(edge);
    edge.b = this.map.get(key);
  }

  loadBias(neuron) {
    const key = this.getNeuronKey(neuron);
    neuron.b = this.map.get(key);
  }
}

export default BatchAcc;
