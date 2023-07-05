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
const true_column_index = 3;
function function_judge_regression(loss, item, y) {
  return Math.abs((item[true_column_index] - y[0]) / y[0]) < 0.08;
}
function function_judge_classification(loss, item, y) {
  const index = Math.findMaxIndex(y);
  return index == item[true_column_index];
}
function function_judge_convolution(loss, item, y) {
  const index = Math.findMaxIndex(y);
  return index == item.tValue
}
const config = {
  training_size: function (size) {
    return Math.floor(size - 50);
  },

  loss_function: LossFunction.CE,

  default_activation: Activation.leakyRelu,
  default_output_activation: Activation.softmax,

  data_size: 1000,
  epoch: 80000,
  batch_size: 10,
  shape: [8, 8, 5],

  features: [
    (data) => data[0],
    (data) => data[1],
    (data) => data[2],
    // (data) => data[3],
    // (data) => data[4],
    // (data) => data[5],
    (data) => (data[0] * data[0]) / 100,
    (data) => (data[1] * data[1]) / 100,
    (data) => (data[2] * data[2]) / 100,
    (data) => (data[0] * data[1]) / 100,
    (data) => (data[0] * data[2]) / 100,
    (data) => (data[1] * data[2]) / 100,
    // (data) => (data[0] * data[1] * data[2]) / 10000,
  ],
  fn_judge: function_judge_convolution,
  fn_true_value: (data) => data.tValue,
  learning_rate: 0.00001,
  updateLearningRate: function (epoch, round) {
    // if (epoch % 100 == 0 && round == 0) this.learning_rate *= 0.99999;
  },
  lambda: 0.1,

  kernels: [
    [
      [1, -1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
    ],
    [
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ],
    [
      [-1, 1, -1],
      [-1, 1, -1],
      [-1, 1, -1],
    ],
    [
      [-1, -1, -1],
      [1, 1, 1],
      [-1, -1, -1],
    ],
  ],
  convo_shape: [
    { action: "convolution" },
    { action: "polling", strategy: "max" },
    { action: "convolution" },
    { action: "polling", strategy: "max" },
    { action: "polling", strategy: "max" },
  ],
  is_convolution: true,
  convolution_input_size: 1024,
};
export default config;
