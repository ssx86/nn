import Network from "./nn/Network.js";
import config from "./nn/config.js";
import Data from "./nn/Data.js";

function main() {
  const { trainingData, testData } = Data;
  const network = new Network(
    config.shape,
    config.features,
    config.loss_function,
    config.is_convolution
  );

  network.setData(trainingData, testData);
  network.train();

  // network.print();
}

main();
