import Network from "./nn/Network.js";
import config from "./nn/config.js";
import BatchAcc from "./nn/BatchAcc.js";
import Data from "./nn/Data.js";

import ansi from "ansi";
const cursor = ansi(process.stdout);

function main() {
  const { trainingData, testData } = Data;
  const network = new Network(config.shape, config.features);


  const batchAcc = new BatchAcc();

  for (let i = 0; i < config.epoch; i++) {

    trainingData.sort(() => (Math.random() > 0.5 ? 1 : -1));
    let batchIndexer = 0;
    for (let j = 0; j < trainingData.length; j++) {
      config.updateLearningRate(j);

      const dataPoint = trainingData[j];
      const tValue = config.fn_true_value(dataPoint);

      network.propagate(dataPoint);
      const y = network.getOutput();

      const { loss, grad, l2 } = network.calcLoss(tValue, y);

      if (batchAcc.better(loss)) {
        batchAcc.clear();
        batchAcc.setLoss(loss);

        network.fetchParams(batchAcc);
      }
      network.backward(grad);
      // network.print();
      // debugger;

      if (
        j >= batchIndexer * config.batch_size ||
        j == trainingData.length - 1
      ) {
        batchIndexer++;

        network.updateParams(batchAcc);
        batchAcc.clear();
      }
    }

    const { loss, result } = network.batchTest(
      testData,
      testData.map((x) => config.fn_true_value(x)),
      (loss, data) => loss < Math.abs(config.fn_true_value(data))
    );
    cursor.goto(0, 0);
    console.table(result.slice(0, 5));
    cursor.bold();
    cursor.red();
    cursor.write("epoch:" + i);
    cursor.reset();
    cursor.write(", test loss: " + (loss * 100).toFixed(2) + "%");
  }
  network.print();
}

main();
