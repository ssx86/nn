import Network from "./Network.js";
import Feature from "./Feature.js";
import Neuron from "./Neuron.js";
import Edge from "./Edge.js";
import OutputNode from "./OutputNode.js";
import { loss } from "./utils.js";
import data from "./data.js";
function main() {
  const features = [
    new Feature((data) => data[0]),
    new Feature((data) => data[1]),
    new Feature((data) => data[0] * data[0]),
    new Feature((data) => data[1] * data[1]),
    new Feature((data) => data[0] * data[1]),
  ];
  const layer1 = [new Neuron(1), new Neuron(1), new Neuron(1), new Neuron(1)];
  const layer2 = [new Neuron(1), new Neuron(1), new Neuron(1), new Neuron(1)];
  const output = new OutputNode();

  const edges = [];
  features.forEach((left) => {
    layer1.forEach((right) => {
      edges.push(Edge.connect(left, right, 0.5));
    });
  });
  layer1.forEach((left) => {
    layer2.forEach((right) => {
      edges.push(Edge.connect(left, right, 0.5));
    });
  });
  layer2.forEach((left) => {
    edges.push(Edge.connect(left, output, 0.5));
  });
  // const data = [];
  // for (let i = 0; i < 100; i++) {
  //   const a = 0.5 * 100,
  //     b = 0.5 * 100;
  //   data.push([a, b, a * b + 3]);
  // }
  // console.log(data);
  const res = data.map((item) => {
    features.forEach((f) => f.input(item));
    layer1.forEach((l) => l.propagate());
    layer2.forEach((l) => l.propagate());
    output.propagate();
    output.backward();
    return { item, value: output.value };
  });

  console.table(edges);

  console.table(features);
  console.table(layer1);
  console.table(layer2);
  console.table([output]);
  // const lossValue = loss(res);
  // console.table(res);
}

main();
