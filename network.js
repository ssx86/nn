import Feature from "./Feature.js";
import Neuron from "./Neuron.js";
import Edge from "./Edge.js";
import { MSE, MSE_grad } from "./utils.js";
class Network {
  loss;
  layers = [];
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
        const node = new Neuron(Math.random() - 0.5);
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
          Edge.connect(left, right, Math.random() - 0.5);
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
    return this.layers[this.layers.length - 1].value;
  }
  backward() {
    for (let i = this.layers.length - 1; i > 0; i--) {
      const nodes = this.layers[i];
      nodes.forEach((n) => n.backward());
    }
  }

  batchCalcLoss(t, y) {
    const loss = MSE(t, y);
    console.log("batch loss", loss);
    const dJ = MSE_grad(t, y);
    // console.log({ dJ });
    this.layers[this.layers.length - 1][0].dOutput = dJ;
  }

  getOutput() {
    return this.layers[this.layers.length - 1].map((n) => n.value);
  }

  print1() {
    const output = this.layers.map((layer) =>
      layer.map((node) => {
        const ws = {};
        node.postEdges.forEach((edge, index) => {
          ws[`w${index + 1}`] = edge.w;
        });
        return {
          [node.constructor.name + node.__id]: {
            b: node.b,
            ...ws,
          },
        };
      })
    );
    console.log(JSON.stringify(output, undefined, 4));
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
          h: node.h,
          dh: node.dh,
          v: node.value,
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
