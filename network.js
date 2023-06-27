import Feature from "./Feature.js";
import Neuron from "./Neuron.js";
import Edge from "./Edge.js";
import BatchAcc from "./BatchAcc.js";
import { MSE, MSE_grad } from "./utils.js";
class Network {
  loss;
  layers = [];
  edges = [];
  constructor(shape, featureFns) {
    // Input Layer
    this.layers.push(
      featureFns.map((fn, index) => {
        const node = new Feature(fn);
        node.name = `Feature ${index}`;
        return node;
      })
    );

    const hiddenLayerCount = shape.length;
    for (let i = 0; i < hiddenLayerCount; i++) {
      // install a new layer
      const nodeCount = shape[i];
      const layer = [];

      for (let j = 0; j < nodeCount; j++) {
        // Output Layer
        const node = new Neuron(Math.random() / 10 - 0.05);
        node.name = `Neuron ${i + 1}-${j + 1}`;
        if (i == hiddenLayerCount - 1) node.isOutput = true;
        layer.push(node);
      }
      this.layers.push(layer);
    }

    // full connect
    const layerCount = hiddenLayerCount + 1;
    for (let i = 0; i < layerCount - 1; i++) {
      const leftNodes = this.layers[i];
      const rightNodes = this.layers[i + 1];
      for (const left of leftNodes) {
        for (const right of rightNodes) {
          this.edges.push(Edge.connect(left, right, Math.random() / 100));
        }
      }
    }
  }
  propagate(input) {
    for (let i = 0; i < this.layers.length; i++) {
      const nodes = this.layers[i];
      nodes.forEach((n) => {
        // Input Layer needs input value
        i == 0 ? n.propagate(input) : n.propagate();
      });
    }
    return this.layers[this.layers.length - 1].output;
  }
  backward(grad) {
    this.getOutputNode().dOutput = grad;
    for (let i = this.layers.length - 1; i > 0; i--) {
      const nodes = this.layers[i];
      nodes.forEach((n) => n.backward());
    }
  }

  fetchParams(batchAcc) {
    for (let i = this.layers.length - 1; i > 0; i--) {
      const nodes = this.layers[i];
      nodes.forEach((n) => n.fetchParam(batchAcc));
    }
  }

  updateParams(batchAcc) {
    for (let i = this.layers.length - 1; i > 0; i--) {
      const nodes = this.layers[i];
      nodes.forEach((n) => n.updateParam(batchAcc));
    }
  }

  calcLoss(t) {
    const l2 = Math.pow(
      this.edges.map((x) => x.w).reduce((sum, x) => sum + (1 / 2) * x * x, 0),
      0.5
    );
    this.loss = MSE(t, this.getOutput()) + l2;
    const grad = MSE_grad(t, this.getOutput());
    return { loss: this.loss, grad: grad, l2 };
  }

  batchTest(data, tData, judgeFn) {
    let count = data.length,
      tCount = 0;
    const result = [];
    data.forEach((item, i) => {
      this.propagate(item);
      const { loss } = this.calcLoss(tData[i]);
      result.push({
        result: judgeFn(loss, item),
        expect: tData[i],
        predict: this.getOutput(),
        loss,
      });
      if (judgeFn(loss, item)) tCount++;
    });
    return { loss: 1 - tCount / count, result };
  }

  getOutputNode() {
    return this.layers[this.layers.length - 1][0];
  }
  getOutput() {
    return this.getOutputNode().output;
  }

  print() {
    const arr = [];
    this.layers.forEach((layer) =>
      layer.forEach((node) => {
        const ws = {};
        node.postEdges.forEach((edge, index) => {
          ws[`w${index + 1}`] = edge.w;
        });
        arr.push({
          name: node.name,
          b: node.b,
          output: node.output,
          dOutput: node.dOutput,
          sumW: node.sumW,
          ...ws,
        });
      })
    );
    console.table(arr);
  }
}

export default Network;
