import Network from "./Network.js";
import { MSE } from "./utils.js";

// import data from "./data.js";
function main() {
  const dataSize = 100;
  const data = [];
  for (let i = 0; i < dataSize; i++) {
    const a = Math.random() * 100,
      b = Math.random() * 100;
    data.push([a, b, a * b + 3 + Math.random() * 10]);
  }
  const trainingDataSize = Math.floor(dataSize * 0.7);
  const trainingData = data.slice(0, trainingDataSize);
  const testData = data.slice(trainingDataSize);

  const network = new Network(
    [3, 2, 1],
    [(data) => data[0], (data) => data[1], (data) => data[0] * data[1]]
  );

  for (let i = 0; i < 300; i++) {
    trainingData.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));

    const ys = [],
      ts = [];
    for (let j = 0; j < 5; j++) {
      network.propagate(trainingData[j]);
      ts.push(trainingData[j][2]);
      ys.push(network.getOutput()[0]);
    }
    network.batchCalcLoss(ts, ys);
    network.backward();
    network.print();
  }

  testData.forEach((item) => {
    network.propagate(item);
    console.log({
      data: item,
      expect: item[2],
      predict: network.getOutput()[0],
      loss: MSE(item[2], network.getOutput()[0]),
    });
  });
}

main();
