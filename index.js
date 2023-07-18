import Network from "./nn/Network.js";
import config from "./nn/config.js";
import {
  TraningDataProviderFactory,
  DataProviderClass,
} from "./nn/data-provider/TrainingDataProviderFactory.js";

async function main() {
  const dataProvider = TraningDataProviderFactory.createProvider(
    // DataProviderClass.LinearDataProvider, { size: 5000 }
    // DataProviderClass.PolynomialDataProvider, { size: 5000 },
    // DataProviderClass.ClassificationDataProvider1, { size: 10000 }
    // DataProviderClass.ClassificationDataProvider2, { size: 5000 }
    DataProviderClass.NumberRecognizationDataProvider
  );
  const { trainDataSet, testDataSet } = await dataProvider.getData();

  const network = new Network(dataProvider, config);

  network.setData(trainDataSet, testDataSet);
  network.train();

  // network.print();
}

main();
