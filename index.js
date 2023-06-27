import Network from "./Network.js";
import config from "./config.js";
import BatchAcc from "./BatchAcc.js";
import data from "./data.js";

import ansi from "ansi";
const cursor = ansi(process.stdout);

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

      const { loss, grad } = network.calcLoss(tValue, y);

      if (batchAcc.better(loss)) {
        batchAcc.clear();
        batchAcc.setLoss(loss);

        network.fetchParams(batchAcc);
      }
      network.backward(grad);

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

    const tPercent = network.batchTest(
      testData,
      testData.map((x) => x[2]),
      (loss, data) => loss < (data[0] + data[1]) / 10
    );
    cursor.savePosition();
    cursor.eraseLine();
    cursor.write("epoch:" + i);
    cursor.write(", test loss: " + (100 - tPercent * 100).toFixed(2) + "%");
    cursor.restorePosition();
  }
  network.print();
}

main();
