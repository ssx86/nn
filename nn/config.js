import Activation from "./Activation.js";
const config = {
  trainingSize: function (size) {
    return Math.floor(size * 0.7);
  },

  default_activation: Activation.leakyRelu,
  data_size: 10000,
  epoch: 5000,
  batch_size: 30,
  shape: [4, 4, 1],
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
    (data) => (data[0] * data[1] * data[2]) / 10000,
  ],
  fn_true_value: (data) => data[3],
  learning_rate: 0.000001,
  updateLearningRate: function (round) {
    // if (round % 100 < 1) this.learning_rate = 0.001;
    // else this.learning_rate = 0.0000003;
  },
  lambda: 0.11,
};
export default config;
