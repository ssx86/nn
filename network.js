import Feature from "./Feature.js";
import Neuron from "./Neuron.js";
import Edge from "./Edge.js";
import { MSE, MSE_grad } from "./utils.js";
import OutputNode from "./OutputNode.js";
class Network {
  loss;
  constructor() {
    this.features = [
      new Feature((data) => data[0]),
      new Feature((data) => data[1]),
      // new Feature((data) => data[0] * data[0]),
      // new Feature((data) => data[1] * data[1]),
      new Feature((data) => data[0] * data[1]),
    ];
    this.layer1 = [
      new Neuron(Math.random() / 2),
      new Neuron(Math.random() / 2),
      new Neuron(Math.random() / 2),
      new Neuron(Math.random() / 2),
    ];
    this.layer2 = [
      new Neuron(Math.random() / 2),
      new Neuron(Math.random() / 2),
      new Neuron(Math.random() / 2),
      new Neuron(Math.random() / 2),
    ];
    this.output = new OutputNode(Math.random() / 2);

    this.edges = [];
    this.features.forEach((left) => {
      this.layer1.forEach((right) => {
        this.edges.push(Edge.connect(left, right, Math.random() / 2));
      });
    });
    this.layer1.forEach((left) => {
      this.layer2.forEach((right) => {
        this.edges.push(Edge.connect(left, right, Math.random() / 2));
      });
    });
    this.layer2.forEach((left) => {
      this.edges.push(Edge.connect(left, this.output, Math.random() / 2));
    });
  }
  propagate(item, print = false) {
    this.features.forEach((f) => f.input(item));
    if (print) {
      console.log("feature");
      console.table(this.features);
    }
    this.layer1.forEach((l) => l.propagate());
    if (print) {
      console.log("l1");
      console.table(this.layer1);
    }
    this.layer2.forEach((l) => l.propagate());
    if (print) {
      console.log("l2");
      console.table(this.layer2);
    }
    this.output.propagate();
    if (print) {
      console.log("out");
      console.table([this.output]);
    }
    return this.output.value;
  }
  backward() {
    this.output.backward();
    this.layer2.forEach((l) => l.backward());
    this.layer1.forEach((l) => l.backward());
  }

  calcLoss(item) {
    const loss = MSE(item[2], this.output.value);
    this.loss = loss;
    console.log(" loss", { loss });
    const dJ = MSE_grad(item[2], this.output.value);
    // return { loss: output.loss, value: output.value };
    this.output.d = dJ;
  }
  batchCalcLoss(t, y) {
    const loss = MSE(t, y);
    // console.log("batch loss", { loss });
    const dJ = MSE_grad(t, y);
    // console.log({ dJ });
    this.output.d = dJ;
  }

  print() {
    this.features.forEach((node) => {
      console.table([node]);
      console.table(node.postEdges);
    });
    this.layer1.forEach((node) => {
      console.table([node]);
      console.table(node.postEdges);
    });
    this.layer2.forEach((node) => {
      console.table([node]);
      console.table(node.postEdges);
    });
    console.table(this.edges);
    console.table([this.output], ["__id", "value", "d", "dh", "b"]);
  }
}

export default Network;
