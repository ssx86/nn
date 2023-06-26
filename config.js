import Activation from "./Activation.js";
const config = {
  learning_rate: 0.00003,
  trainingSize: function (size) {
    return Math.floor(size * 0.7);
  },

  default_activation: Activation.relu,
  clip_threshold: 1000000000000,
  data_size: 10000,
  epoch: 200,
  batch_size: 20,
  shape: [1],
  features: [
    (data) => data[0],
    (data) => data[1],
    (data) => (data[0] * data[1]) / 100,
  ],
  updateLearningRate: function (round) {
    if (round % 100 == 0) this.learning_rate == 0.0001;
    else this.learning_rate = 0.00003;
  },
};
export default config;
