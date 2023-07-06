import DataProvider from "./DataProvider.js";


class ClassificationDataProvider1 extends DataProvider {
  get() {
    const data = [];

    for (let i = 0; i < dataSize; i++) {
      const a = Math.floor(Math.random() * 100);
      const b = Math.floor(Math.random() * 100);
      const c = Math.floor(Math.random() * 100);
      data.push([a, b, c, Math.findMaxIndex([a * b, b * c, c * a])]);
    }
    return data;
  }

}

export default ClassificationDataProvider1;