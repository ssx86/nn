import Network from "./nn/Network.js";
import config from "./nn/config.js";
import {
  TraningDataProviderFactory,
  DataProviderClass,
} from "./nn/data-provider/TrainingDataProviderFactory.js";

async function main() {
  const dataProvider = TraningDataProviderFactory.createProvider(
    DataProviderClass.NumberRecognizationDataProvider
    // { size: 10000 }
  );

  const network = new Network(dataProvider, config);

  const { trainDataSet, testDataSet } = await dataProvider.getData();
  network.setData(trainDataSet, testDataSet);
  network.train();

  // network.print();
}

main();
