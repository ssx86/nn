import Feature from "./Feature.js";
import Neuron from "./Neuron.js";
import Edge from "./Edge.js";
import { MSE, MSE_grad } from "./utils.js";
import OutputNode from "./OutputNode.js";
class Network {
  constructor() {
    this.features = [
      new Feature((data) => data[0]),
      new Feature((data) => data[1]),
      new Feature((data) => data[0] * data[0]),
      new Feature((data) => data[1] * data[1]),
      new Feature((data) => data[0] * data[1]),
    ];
    this.layer1 = [
      new Neuron(0.5),
      new Neuron(0.5),
      new Neuron(0.5),
      new Neuron(0.5),
    ];
    this.layer2 = [
      new Neuron(0.5),
      new Neuron(0.5),
      new Neuron(0.5),
      new Neuron(0.5),
    ];
    this.output = new OutputNode(0.5);

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
  propagate(item) {
    this.features.forEach((f) => f.input(item));
    this.layer1.forEach((l) => l.propagate());
    this.layer2.forEach((l) => l.propagate());
    this.output.propagate();
    const loss = MSE(item[2], this.output.value);
    console.log({ loss });
    const dJ = MSE_grad(item[2], this.output.value);
    // return { loss: output.loss, value: output.value };
    this.output.d = dJ;
  }
  backward() {
    this.output.backward();
    this.layer2.forEach((l) => l.backward());
    this.layer1.forEach((l) => l.backward());

    console.table(this.edges);
    console.table(this.layer1);
    console.table(this.layer2);
    console.table(this.output);
  }
}

export default Network;
