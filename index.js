import Network from "./Network.js";
import { MSE, config } from "./utils.js";

// import data from "./data.js";
function main() {
  const dataSize = 10000;
  const data = [];
  for (let i = 0; i < dataSize; i++) {
    const a = Math.random() * 100,
      b = Math.random() * 100;
    data.push([a, b, a * b + Math.floor(Math.random() * 5)]);
  }

  const trainingDataSize = dataSize - 20;
  const trainingData = data.slice(0, trainingDataSize);
  const testData = data.slice(trainingDataSize);

  const network = new Network(
    [5, 2, 1],
    [(data) => data[0], (data) => data[1], (data) => (data[0] * data[1]) / 1000]
  );

  console.log("============");
  network.print();
  console.log("============");

  for (let i = 0; i < 5000; i++) {
    trainingData.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));

    const ys = [],
      ts = [];
    for (let j = 0; j < trainingData.length; j++) {
      network.propagate(trainingData[j]);
      ts.push(trainingData[j][2]);
      ys.push(network.getOutput()[0]);
    }
    network.batchCalcLoss(ts, ys);
    network.backward();

    // config.learning_rate *= 0.7;
    // if (config.learning_rate < 0.0000001) config.learning_rate = 0.0000001;

    console.log("round: ", i);
    // network.print();
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
