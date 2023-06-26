import Network from "./Network.js";
import { MSE } from "./utils.js";
import config from "./config.js";
import BatchAcc from "./BatchAcc.js";
import data from "./data.js";

function main() {
  const { trainingData, testData } = data;
  const network = new Network(config.shape, config.features);

  console.log("============");
  network.print();
  console.log("============");

  const batchAcc = new BatchAcc();

  for (let i = 0; i < config.epoch; i++) {
    trainingData.sort(() => (Math.random() > 0.5 ? 1 : -1));
    let batchIndexer = 0;
    for (let j = 0; j < trainingData.length; j++) {
      config.updateLearningRate(j);

      const dataPoint = trainingData[j];
      const tValue = dataPoint[2];

      network.propagate(dataPoint);
      const y = network.getOutput();

      const loss = network.batchCalcLoss(tValue, y);

      if (batchAcc.better(loss)) {
        batchAcc.clear();
        batchAcc.setLoss(loss);

        network.fetchParams(batchAcc);
      }
      network.backward();

      if (
        j >= batchIndexer * config.batch_size ||
        j == trainingData.length - 1
      ) {
        batchIndexer++;

        // console.log("    batch: ", j, batchAcc.bestLoss);
        network.updateParams(batchAcc);
        batchAcc.clear();
      }
    }

    console.log("epoch: ", i, network.loss);
  }
  network.print();

  testData.forEach((item) => {
    network.propagate(item);
    console.log({
      data: item,
      expect: item[2],
      predict: network.getOutput(),
      loss: MSE(item[2], network.getOutput()),
    });
  });
}

main();
