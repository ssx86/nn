import Network from "./nn/Network.js";
import config from "./nn/config.js";
import { TraningDataProviderFactory, DataProviderClass } from "./nn/data-provider/TrainingDataProviderFactory.js";

async function main() {
  const network = new Network(
    config.shape,
    config.features,
    config.loss_function,
    config.is_convolution
  );

  const dataProvider = TraningDataProviderFactory.createProvider(DataProviderClass.NumberRecognizationDataProvider)

  dataProvider.prepare()
  const { trainDataSet, testDataSet } = await dataProvider.getData()
  network.setData(trainDataSet, testDataSet);
  network.train();

  // network.print();
}

main();
