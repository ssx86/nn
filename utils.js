function MSE(t, Y) {
  if (Array.isArray(t)) {
    let sum = 0;
    for (let i = 0; i < t.length; i++) {
      sum += Math.pow(t[i] - Y[i], 2);
    }
    return sum / t.length / 2;
  } else {
    const diff = t - Y;
    return (diff * diff) / 2;
  }
}

function MSE_grad(t, Y) {
  if (Array.isArray(t)) {
    let sum = 0;
    for (let i = 0; i < t.length; i++) {
      sum += Y[i] - t[i];
    }
    return sum / t.length;
  } else {
    const diff = Y - t;
    return diff;
  }
}

function relu(x) {
  return x > 0 ? x : 0;
}

function dRelu(x) {
  return x > 0 ? 1 : 0;
}
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}
function dSigmoid(x) {
  const s = sigmoid(x);
  return s * (1 - s);
}
const config = {
  learning_rate: 0.001,
  data_size: 10000,
  epoch_size: 5000,
  batch_size: 100,
  updateLearningRate: function (round) {
    // if (round % 1000 == 0) this.learning_rate *= 0.5;
  },
};
export { relu, dRelu, sigmoid, dSigmoid, MSE, MSE_grad, config };
