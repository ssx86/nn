import Feature from "./Feature.js";
import Neuron from "./Neuron.js";
import Edge from "./Edge.js";
import config from "./config.js"
import { MSE, MSE_grad, CE, CE_grad } from "./utils.js";
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
        const node = new Neuron(Math.random() / 10 - 0.05, config.default_activation);
        node.name = `Neuron ${i + 1}-${j + 1}`;
        if (i == hiddenLayerCount - 1) {
          node.activation = config.default_output_activation
          node.isOutput = true;
        }
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
  }
  backward(grad) {
    // this.getOutputNode().dOutput = grad;
    this.getOutputNodes().forEach((node, index) => {
      node.dOutput = grad[index]
    })
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

  calcLossCE(t) {
    // const l2 = Math.pow(
    //   this.edges.map((x) => x.w).reduce((sum, x) => sum + (1 / 2) * x * x, 0),
    //   0.5
    // );
    this.loss = CE(t, this.getOutputs());
    const grad = CE_grad(t, this.getOutputs());
    return { loss: this.loss, grad: grad };
  }

  batchTest(data, tData, judgeFn) {
    let count = data.length,
      tCount = 0;
    const res = [];
    data.forEach((item, i) => {
      this.propagate(item);
      // const { loss } = this.calcLoss(tData[i]);
      const { loss } = this.calcLossCE(tData[i]);
      const result = judgeFn(loss, item)
      res.push({
        item,
        result: result,
        expect: tData[i],
        predict: this.getOutputs(),
        loss,
      });
      if (result) tCount++;
    });
    return { loss: 1 - tCount / count, result: res };
  }

  getOutputNode() {
    return this.layers[this.layers.length - 1][0];
  }
  getOutput() {
    return this.getOutputNode().output;
  }

  getOutputNodes() {
    return this.layers[this.layers.length - 1]
  }
  getOutputs() {
    return this.getOutputNodes().map(x => x.output)
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
