class DataProvider {
  options
  constructor(options) {
    this.options = options
  }

  judgeFn() {
    throw Error("did not implement judgeFn.")
  }

  async prepare() { throw Error("did not implement prepare.") }
  getTrainDataSet() { throw Error("did not implement getTrainDataSet.") }
  getTestDataSet() { throw Error("did not implement getTestDataSet.") }

  async getData() {
    await this.prepare()
    const [trainDataSet, testDataSet] = await Promise.all([this.getTrainDataSet(), this.getTestDataSet()])
    return { trainDataSet, testDataSet }
  }
}

export default DataProvider