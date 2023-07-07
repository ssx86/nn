import DataProvider from "./DataProvider.js";

class LinearDataProvider extends DataProvider {
  judgeFunction = DataProvider.JudgeFunctions.function_judge_regression;

  prepare() {
    for (let i = 0; i < this.options.size; i++) {
      const a = Math.random() * 100,
        b = Math.random() * 100;
      this.dataSet.push(this.createDataItem([a, b], a + 1));
    }
  }
  getFeatureFns() {
    return [({ data }) => data[0], ({ data }) => data[1]];
  }
}

export default LinearDataProvider;
