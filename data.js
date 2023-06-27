import config from "./config.js";

const dataSize = config.data_size;
const data = [];
for (let i = 0; i < dataSize; i++) {
  const a = Math.random() * 100,
    b = Math.random() * 100;
  data.push([a, b, a * 2 + 9 * b + 3 * a * b]);
}

const trainingDataSize = config.trainingSize(config.data_size);
const trainingData = data.slice(0, trainingDataSize);
const testData = data.slice(trainingDataSize);

export default { trainingData, testData };
