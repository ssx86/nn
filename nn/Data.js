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

  function category(a, b, c, d, e, f) {
    const s = [a, b, c, d, e, f]

    return Math.findMaxIndex(s)
  }

  const N = 6
  const a = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  const c = Math.floor(Math.random() * 100);
  const d = Math.floor(Math.random() * 100);
  const e = Math.floor(Math.random() * 100);
  const f = Math.floor(Math.random() * 100);
  data.push([a, b, c, d, e, f, category(a, b, c, d, e, f)]);
}

const trainingDataSize = config.trainingSize(config.data_size);
const trainingData = data.slice(0, trainingDataSize);
const testData = data.slice(trainingDataSize);

console.log(testData)

export default { trainingData, testData };
