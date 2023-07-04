import NumberRecognizationData from "../helpers/NumberRecognizationData.js";
import config from "./config.js";

const dataSize = config.data_size;

function polynomial() {
  const data = [];

  for (let i = 0; i < dataSize; i++) {
    const a = Math.random() * 100,
      b = Math.random() * 100,
      c = Math.random() * 100;
    data.push([
      a,
      b,
      c,
      a +
      b +
      3 * c +
      0.4 * a * b +
      0.3 * b * c +
      0.5 * a * c +
      0.001 * a * b * c,
      // a + b + 3 * c + 0.4,
    ]);
  }
  return data;
}

function linear() {
  const data = [];
  for (let i = 0; i < dataSize; i++) {
    const a = Math.random() * 100,
      b = Math.random() * 100;
    data.push([a, b, a + 1]);
  }
  return data;
}

function classification() {
  const data = [];

  for (let i = 0; i < dataSize; i++) {
    const a = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    const c = Math.floor(Math.random() * 100);
    data.push([a, b, c, Math.findMaxIndex([a * b, b * c, c * a])]);
  }
  return data;
}

function classification2() {
  const data = [];

  for (let i = 0; i < dataSize; i++) {
    const a = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    const c = Math.floor(Math.random() * 100);
    data.push([a, b, c, Math.floor((a + b + c) / 100)]);
  }
  return data;
}

// convolutional
function number_recognization() {
  // NumberRecognizationData
}

const data = classification();
const trainingDataSize = config.training_size(config.data_size);
const trainingData = data.slice(0, trainingDataSize);
const testData = data.slice(trainingDataSize);

export default { trainingData, testData };
