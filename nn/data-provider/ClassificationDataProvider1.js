import DataProvider from "./DataProvider.js";


class ClassificationDataProvider1 extends DataProvider {
  judgeFunction = DataProvider.JudgeFunctions.function_judge_classification;

  prepare() {
    for (let i = 0; i < (this.options?.size || 10000); i++) {
      const a = Math.floor(Math.random() * 100);
      const b = Math.floor(Math.random() * 100);
      const c = Math.floor(Math.random() * 100);
      this.dataSet.push(this.createDataItem([a, b, c], Math.findMaxIndex([a * b, b * c, c * a])));
    }
  }
  getFeatureFns() {
    return [({ data }) => data[0], ({ data }) => data[1], ({ data }) => data[2]];
  }

}

export default ClassificationDataProvider1;