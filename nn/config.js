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
  loss_function: LossFunction.CE,
  default_activation: Activation.sigmoid,
  default_output_activation: Activation.softmax,
  epoch: 80000,
  batch_size: 10,
  shape: [30, 30, 5],
  learning_rate: 0.00001,
  updateLearningRate: function (epoch, round) {
    // if (epoch % 100 == 0 && round == 0) this.learning_rate *= 0.99999;
  },
  lambda: 0.1,
};
export default config;
