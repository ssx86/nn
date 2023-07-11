import Network from "./nn/Network.js";
import config from "./nn/config.js";
import {
  TraningDataProviderFactory,
  DataProviderClass,
} from "./nn/data-provider/TrainingDataProviderFactory.js";

async function main() {
  const dataProvider = TraningDataProviderFactory.createProvider(
    DataProviderClass.LinearDataProvider
    // { size: 10000 }
  );
  const { trainDataSet, testDataSet } = await dataProvider.getData();

  const network = new Network(dataProvider, config);

  network.setData(trainDataSet, testDataSet);
  network.train();

  // network.print();
}

main();
