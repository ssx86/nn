import DataProvider from "./DataProvider.js";

class ClassificationDataProvider2 extends DataProvider {
  get() {
    const data = [];

    for (let i = 0; i < dataSize; i++) {
      const a = Math.floor(Math.random() * 100);
      const b = Math.floor(Math.random() * 100);
      const c = Math.floor(Math.random() * 100);
      data.push([a, b, c, Math.floor((a + b + c) / 100)]);
    }
    return data;
  }

}

export default ClassificationDataProvider2;