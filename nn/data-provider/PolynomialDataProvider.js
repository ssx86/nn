import DataProvider from "./DataProvider.js";


class PolynomialDataProvider extends DataProvider {
  judgeFunction = DataProvider.JudgeFunctions.function_judge_regression;
  prepare() {
    for (let i = 0; i < (this.options?.size || 20000); i++) {
      const a = Math.random() * 100
      const b = Math.random() * 100
      const c = Math.random() * 100;
      this.dataSet.push(
        this.createDataItem(
          [a, b, c],
          a +
          b +
          3 * c +
          0.4 * a * b +
          0.3 * b * c +
          0.5 * a * c +
          0.001 * a * b * c
        ))
    }
  }

  getFeatureFns() {
    return [
      ({ data }) => data[0],
      ({ data }) => data[1],
      ({ data }) => data[2],
      ({ data }) => data[0] * data[1] / 100,
      ({ data }) => data[0] * data[2] / 100,
      ({ data }) => data[1] * data[2] / 100,
      ({ data }) => data[0] * data[1] * data[2] / 10000,
    ];
  }

}


export default PolynomialDataProvider;
