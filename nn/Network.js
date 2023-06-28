import Feature from "./Feature.js";
import Neuron from "./Neuron.js";
import Edge from "./Edge.js";
import config from "./config.js";
import BatchAcc from "./BatchAcc.js";

import ansi from "ansi";
const cursor = ansi(process.stdout);

class Network {
  lossFn;
  loss;
  layers = [];
  edges = [];
  trainingData = [];
  testData = [];
  constructor(shape, featureFns, lossFn) {
    this.lossFn = lossFn;
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
        const node = new Neuron(
          Math.random() / 10 - 0.05,
          config.default_activation
        );
        node.name = `Neuron ${i + 1}-${j + 1}`;
        if (i == hiddenLayerCount - 1) {
          node.activation = config.default_output_activation;
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

  setData(trainingData, testData) {
    this.trainingData = trainingData;
    this.testData = testData;
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
    this.getOutputNodes().forEach((node, index) => {
      node.dOutput = grad[index];
    });
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
    const loss = this.lossFn.loss(t, this.getOutput()) + l2;
    const grad = this.lossFn.grad(t, this.getOutput());
    return { loss, grad, l2 };
  }

  batchTest(tData) {
    const data = this.testData;
    let count = data.length,
      tCount = 0;
    const res = [];
    data.forEach((item, i) => {
      this.propagate(item);
      const { loss } = this.calcLoss(tData[i]);
      const result = config.fn_judge(loss, item, this.getOutputs());
      res.push({
        item,
        result: result,
        expect: tData[i],
        predict: this.getOutputs(),
        loss,
      });
      if (result) tCount++;
    });
    return { accuracy: tCount / count, result: res };
  }

  getOutputNode() {
    return this.layers[this.layers.length - 1][0];
  }
  getOutput() {
    return this.getOutputNode().output;
  }

  getOutputNodes() {
    return this.layers[this.layers.length - 1];
  }
  getOutputs() {
    return this.getOutputNodes().map((x) => x.output);
  }

  train() {
    const batchAcc = new BatchAcc();

    for (let i = 0; i < config.epoch; i++) {
      this.trainingData.sort(() => (Math.random() > 0.5 ? 1 : -1));
      let batchIndexer = 0;
      for (let j = 0; j < this.trainingData.length; j++) {
        config.updateLearningRate(j);

        const dataPoint = this.trainingData[j];
        const tValue = config.fn_true_value(dataPoint);

        this.propagate(dataPoint);

        const y = this.getOutputs();
        const { loss, grad, l2 } = this.calcLoss(tValue, y);

        if (batchAcc.better(loss)) {
          batchAcc.clear();
          batchAcc.setLoss(loss);

          this.fetchParams(batchAcc);
        }
        this.backward(grad);

        if (
          j >= batchIndexer * config.batch_size ||
          j == this.trainingData.length - 1
        ) {
          batchIndexer++;

          this.updateParams(batchAcc);
          batchAcc.clear();
        }
      }

      const { accuracy, result } = this.batchTest(
        this.testData.map((x) => config.fn_true_value(x))
      );
      cursor.hide();
      cursor.goto(0, 0);
      console.table(result.slice(0, 5));

      cursor.bold();
      cursor.red();
      cursor.write("epoch:" + i);
      cursor.reset();
      cursor.write(", test accuracy: " + (accuracy * 100).toFixed(2) + "%");
    }
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
