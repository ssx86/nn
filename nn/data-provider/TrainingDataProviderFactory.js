import ClassificationDataProvider1 from "./ClassificationDataProvider1.js";
import ClassificationDataProvider2 from "./ClassificationDataProvider2.js";
import LinearDataProvider from "./LinearDataProvider.js";
import NumberRecognizationDataProvider from "./NumberRecognizationData.js";
import PolynomialDataProvider from "./PolynomialDataProvider.js";

const DataProviderClass = {
  ClassificationDataProvider1,
  ClassificationDataProvider2,
  LinearDataProvider,
  NumberRecognizationDataProvider,
  PolynomialDataProvider,
}

class TraningDataProviderFactory {
  static createProvider(typeClass, options) {
    return new typeClass(options)
  }
}

export {
  DataProviderClass,
  TraningDataProviderFactory,
}