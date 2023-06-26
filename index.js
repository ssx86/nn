import Network from "./Network.js";
import { MSE, config } from "./utils.js";

// import data from "./data.js";
function main() {
  const dataSize = config.data_size;
  const data = [];
  for (let i = 0; i < dataSize; i++) {
    const a = Math.random() * 1000,
      b = Math.random() * 1000;
    data.push([a, b, a]);
  }

  const trainingDataSize = dataSize - 20;
  const trainingData = data.slice(0, trainingDataSize);
  const testData = data.slice(trainingDataSize);

  const network = new Network([2, 1], [(data) => data[0], (data) => data[1]]);

  console.log("============");
  network.print();
  console.log("============");

  for (let i = 0; i < config.epoch_size; i++) {
    trainingData.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));

    const ys = [],
      ts = [];
    for (let j = 0; j < config.batch_size; j++) {
      network.propagate(trainingData[j]);
      ts.push(trainingData[j][2]);
      ys.push(network.getOutput()[0]);
    }
    network.batchCalcLoss(ts, ys);
    network.backward();
    config.updateLearningRate(i);

    if (i % (dataSize / 100) == 0) console.log("round", i, network.loss);
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
