import DataProvider from "./DataProvider.js";


class LinearDataProvider extends DataProvider {
  get() {
    const data = [];
    for (let i = 0; i < dataSize; i++) {
      const a = Math.random() * 100,
        b = Math.random() * 100;
      data.push([a, b, a + 1]);
    }
    return data;
  }

}

export default LinearDataProvider;
