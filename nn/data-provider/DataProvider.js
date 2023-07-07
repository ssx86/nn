class DataProvider {
  static JudgeFunctions = {
    function_judge_regression: (loss, item, y) => {
      return Math.abs((item.expect - y[0]) / y[0]) < 0.1;
    },
    function_judge_classification: (loss, item, y) => {
      const index = Math.findMaxIndex(y);
      return index == item.expect;
    },
    function_judge_convolution: (loss, item, y) => {
      const index = Math.findMaxIndex(y);
      return index == item.expect;
    },
  };

  createDataItem(data, expect, extra) {
    return {
      data,
      expect,
      extra,
    };
  }
  dataSet = [];

  options = {};
  constructor(options) {
    this.options = options;
  }

  judgeFn() {
    throw Error("did not implement judgeFn.");
  }

  async prepare() {
    return;
  }
  async getTestDataSet() {
    return this.dataSet.slice(0, Math.floor(this.dataSet.length * 0.7));
  }
  async getTrainDataSet() {
    return this.dataSet.slice(Math.floor(this.dataSet.length * 0.7));
  }

  async getData() {
    await this.prepare();
    this.dataSet.sort(() => Math.random() - 0.5);
    const [trainDataSet, testDataSet] = await Promise.all([
      this.getTrainDataSet(),
      this.getTestDataSet(),
    ]);
    return { trainDataSet, testDataSet };
  }

  getFeatureFns() {
    throw Error("please implement getFeatures method");
  }

  judgeFunction(value) {
    throw Error("please implement judgeFunction");
  }
}

export default DataProvider;
