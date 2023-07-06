import config from "../config.js";
import DataProvider from "./DataProvider.js";


class PolynomialDataProvider extends DataProvider {
  get() {
    const dataSize = config.data_size;

    const data = [];

    for (let i = 0; i < dataSize; i++) {
      const a = Math.random() * 100,
        b = Math.random() * 100,
        c = Math.random() * 100;
      data.push([
        a,
        b,
        c,
        a +
        b +
        3 * c +
        0.4 * a * b +
        0.3 * b * c +
        0.5 * a * c +
        0.001 * a * b * c,
        // a + b + 3 * c + 0.4,
      ]);
    }
    return data;
  }

}

export default PolynomialDataProvider;
