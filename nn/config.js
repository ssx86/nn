import Activation from "./Activation.js";
import LossFunction from "./LossFunction.js";

Math.findMaxIndex = function (arr) {
  let index = 0,
    max = arr[0];
  arr.forEach((x, i) => {
    if (x > max) {
      index = i;
      max = x;
    }
  });
  return index;
};

const config = {
  loss_function: LossFunction.MSE,
  default_activation: Activation.leakyRelu,
  default_output_activation: Activation.leakyRelu,
  epoch: 80000,
  batch_size: 100,
  shape: [
    {
      type: "input",
    },
    {
      type: "fc",
      activation: Activation.leakyRelu,
      size: 3,
    },
    {
      type: "fc",
      activation: Activation.leakyRelu,
      size: 3,
    },
    {
      type: "output",
      activation: Activation.leakyRelu,
      size: 1,
    }
  ],
  learning_rate: 0.0000003,
  realtimeLearningRate: function ({ epoch, batch, batchIndexer }) {
    // const base = this.learning_rate * Math.pow(0.9, Math.max(50, epoch) - 50)
    const base = this.learning_rate;
    if (batchIndexer == 0) return base * 5 * Math.random();
    else return base;
  },
  lambda: 1,
};
export default config;
