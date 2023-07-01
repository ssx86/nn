import Activation from "./Activation.js";
import LossFunction from "./LossFunction.js";


const true_column_index = 3
function function_judge_regression(loss, item, y) {
  return Math.abs((item[true_column_index] - y[0]) / y[0]) < 0.05;
}
function function_judge_classification(loss, item, y) {
  let index = 0,
    max = y[0];
  y.forEach((x, i) => {
    if (x > max) {
      index = i;
      max = x;
    }
  });
  return index + 1 == item[true_column_index];
}
const config = {
  trainingSize: function (size) {
    return Math.floor(size * 0.7);
  },

  loss_function: LossFunction.CE,

  default_activation: Activation.leakyRelu,
  default_output_activation: Activation.softmax,
  data_size: 10000,
  epoch: 50000,
  batch_size: 50,
  shape: [5, 8, 6, 10],
  features: [
    (data) => data[0],
    (data) => data[1],
    (data) => data[2],
    (data) => (data[0] * data[0]) / 100,
    (data) => (data[1] * data[1]) / 100,
    (data) => (data[2] * data[2]) / 100,
    (data) => (data[0] * data[1]) / 100,
    (data) => (data[0] * data[2]) / 100,
    (data) => (data[1] * data[2]) / 100,
    // (data) => (data[0] * data[1] * data[2]) / 10000,
  ],
  fn_judge: function_judge_classification,
  fn_true_value: (data) => data[true_column_index],
  learning_rate: 0.00003,
  updateLearningRate: function (round) {
    // if (round % 100 < 1) this.learning_rate = 0.001;
    // else this.learning_rate = 0.0000003;
  },
  lambda: 0.01,
};
export default config;
