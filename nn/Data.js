import config from "./config.js";

const dataSize = config.data_size;
const data = [];
// for (let i = 0; i < dataSize; i++) {
//   const a = Math.random() * 100,
//     b = Math.random() * 100,
//     c = Math.random() * 100;
//   data.push([
//     a,
//     b,
//     c,
//     a + b + 3 * c + 0.4 * a * b + 0.3 * b * c + 0.5 * a * c + 0.001 * a * b * c,
//     // a + b + 3 * c + 0.4,
//   ]);
// }
// for (let i = 0; i < dataSize; i++) {
//   const a = Math.random() * 100,
//     b = Math.random() * 100;
//   data.push([a, b, a + b]);
// }

for (let i = 0; i < dataSize; i++) {
  function category(a, b, c) {
    if (a * a + b * b < c + c) {
      return 1
    } else {
      return a > b ? 2 : 3
    }
  }

  const N = 3
  const a = Math.floor(Math.random() * 100),
    b = Math.floor(Math.random() * 100),
    c = Math.floor(Math.random() * 100);
  data.push([a, b, c, category(a, b, c)]);
}

const trainingDataSize = config.trainingSize(config.data_size);
const trainingData = data.slice(0, trainingDataSize);
const testData = data.slice(trainingDataSize);

export default { trainingData, testData };
