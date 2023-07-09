import Feature from "./Feature.js";
import Neuron from "./Neuron.js";
import Edge from "./Edge.js";
import config from "./config.js";
import BatchAcc from "./BatchAcc.js";

import ansi from "ansi";
import Activation from "./Activation.js";
import Layer from "./Layer.js";
const cursor = ansi(process.stdout);

class Network {
  env = {};
  dataProvider;
  lossFn;
  loss;
  layers = [];
  edges = [];
  trainingData = [];
  testData = [];
  dJ;
  constructor(dataProvider, options) {
    this.dataProvider = dataProvider;
    this.lossFn = options.loss_function;

    // Input Layer
    const featureFns = this.dataProvider.getFeatureFns();
    const inputLayer = new Layer(
      this,
      featureFns.map((fn, index) => {
        const node = new Feature(this, fn);
        node.name = `Feature ${index}`;
        return node;
      })
    );

    inputLayer.isFeature = true;
    this.layers.push(inputLayer);

    const hiddenLayerCount = options.shape.length;
    for (let i = 0; i < hiddenLayerCount; i++) {
      // install a new layer
      const nodeCount = options.shape[i];
      const nodes = [];

      for (let j = 0; j < nodeCount; j++) {
        // Output Layer
        const node = new Neuron(
          this,
          Math.random() / 10 - 0.05,
          config.default_activation
        );
        node.name = `Neuron ${i + 1}-${j + 1}`;
        if (i == hiddenLayerCount - 1) {
          node.activation = config.default_output_activation;
          node.isOutput = true;
        }
        nodes.push(node);
      }
      const layer = new Layer(this, nodes);
      if (i == hiddenLayerCount - 1) {
        layer.activation = config.default_output_activation;
        layer.isOutput = true;
      }
      this.layers.push(layer);
    }

    // full connect
    const layerCount = hiddenLayerCount + 1;
    for (let i = 0; i < layerCount - 1; i++) {
      const leftLayer = this.layers[i];
      const rightLayer = this.layers[i + 1];
      for (const left of leftLayer.nodes()) {
        for (const right of rightLayer.nodes()) {
          this.edges.push(Edge.connect(this, left, right, Math.random() / 100));
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
      const layer = this.layers[i];
      // Input Layer needs input value
      i == 0 ? layer.propagate(input) : layer.propagate();
    }
  }
  backward() {
    this.getOutputLayer()
      .nodes()
      .forEach((node, index) => {
        node.dOutput = this.dJ[index];
      });

    for (let i = this.layers.length - 1; i > 0; i--) {
      const layer = this.layers[i];
      layer.backward();
    }
  }

  saveParams(batchAcc, loss, miss) {
    batchAcc.setLoss(loss);
    batchAcc.setMiss(miss);
    this.layers.forEach((layer, index) => {
      if (index == 0) return
      layer.nodes().forEach((neuron) => {
        batchAcc.saveBias(neuron);
      });
    });
    this.edges.forEach((edge) => {
      batchAcc.saveWeight(edge);
    });
  }

  loadParams(batchAcc) {
    this.layers.forEach((layer, index) => {
      if (index == 0) return
      layer.nodes().forEach((neuron) => {
        batchAcc.loadBias(neuron);
      });
    });
    this.edges.forEach((edge) => {
      batchAcc.loadWeight(edge);
    });
  }

  calcLoss(t) {
    const l2 = Math.pow(
      this.edges.map((x) => x.w).reduce((sum, x) => sum + (1 / 2) * x * x, 0),
      0.5
    );
    const loss = this.lossFn.loss(t, this.getOutputs()) + l2;
    const grad = this.lossFn.grad(t, this.getOutputs());
    return { loss, grad, l2 };
  }

  batchTest(targets) {
    let count = targets.length;
    let tCount = 0;
    const res = [];
    targets.forEach((item, i) => {
      this.propagate(item);
      const { loss } = this.calcLoss(item.expect);
      const result = this.dataProvider.judgeFunction(
        loss,
        item,
        this.getOutputs()
      );
      res.push({
        // path: item.extra.filePath,
        result,
        expect: item.expect,
        prob: this.getOutputs()
          .map((v, i) => [v, i])
          .sort((a, b) => b[0] - a[0])
          .map((x) => `${x[1]}(${(100 * x[0]).toFixed(3)}%)`)
          .toString(),
        loss,
      });
      if (result) tCount++;
    });
    return { accuracy: tCount / count, result: res };
  }

  getOutputLayer() {
    return this.layers[this.layers.length - 1];
  }
  getOutputs() {
    return this.getOutputLayer()
      .nodes()
      .map((x) => x.output);
  }

  setEnv({ epoch, batch, batchIndexer }) {
    this.env = { epoch, batch, batchIndexer }
  }

  realtimeLearningRate() {
    return config.realtimeLearningRate(this.env)
  }

  train() {
    let bestAccuracy = 0
    const epochAcc = new BatchAcc();
    for (let i = 0; i < config.epoch; i++) {
      const batchAcc = new BatchAcc();

      this.trainingData.sort(() => (Math.random() > 0.5 ? 1 : -1));
      let batchIndexer = 0;

      let bestLoss, bestMiss = 0, currentL2;
      for (let j = 0; j < this.trainingData.length; j++) {
        this.setEnv({ epoch: i, batch: Math.floor(j / config.batch_size), batchIndexer })

        const dataPoint = this.trainingData[j];

        this.propagate(dataPoint);

        const y = this.getOutputs();
        const { loss, grad, l2 } = this.calcLoss(dataPoint.expect, y);
        currentL2 = l2;
        this.dJ = grad;


        this.backward();

        if (
          j >= batchIndexer * config.batch_size ||
          j == this.trainingData.length - 1
        ) {
          batchIndexer++;

          const { accuracy, result } = this.batchTest(this.testData);
          cursor.goto(0, 0);
          cursor.write("miss:" + (1 - accuracy));
          if (batchAcc.hasMoreLossThan(loss, 1 - accuracy)) {
            this.saveParams(batchAcc, loss, 1 - accuracy);
            bestLoss = loss
            bestMiss = 1 - accuracy;
          } else {
            this.loadParams(batchAcc);
          }

        }
      }

      // if (epochAcc.hasMoreLossThan(bestLoss)) {
      //   this.saveParams(epochAcc, bestLoss);
      // } else {
      //   this.loadParams(epochAcc);
      // }

      const { accuracy, result } = this.batchTest(this.testData);
      bestAccuracy = Math.max(bestAccuracy, accuracy);
      cursor.goto(0, 1);
      cursor.beep();
      console.table(result.slice(0, 20));

      cursor.bold();
      cursor.red();
      cursor.write("epoch:" + i);
      cursor.reset();
      cursor.write("   (loss=" + bestLoss.toFixed(3) + ")");
      cursor.write("   test accuracy: " + (accuracy * 100).toFixed(2) + "%");
      cursor.write("   lr: " + this.realtimeLearningRate(this.env));
      cursor.write("   best accuracy: " + (bestAccuracy * 100).toFixed(2) + "%");
    }
  }

  print() {
    const arr = [];
    this.layers.forEach((layer) =>
      layer.nodes().forEach((node) => {
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
