const config = {
  learning_rate: 0.00003,
  trainingSize: function (size) {
    return Math.floor(size * 0.7);
  },
  clip_threshold: 1000000000000,
  data_size: 10000,
  epoch_count: 200,
  batch_size: 10,
  shape: [1],
  updateLearningRate: function (round) {
    if (round % 100 == 0) this.learning_rate == 0.0001;
    else this.learning_rate = 0.00003;
  },
};
export default config;
