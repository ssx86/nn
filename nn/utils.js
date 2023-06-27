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

function CE(yTrue, yPred) {
  // crossEntropyLoss
  const epsilon = 1e-15;
  let loss = 0;
  for (let i = 0; i < yPred.length; i++) {
    const t = i + 1 == yTrue ? 1 : 0
    loss += t * Math.log(yPred[i] + epsilon);
  }
  return -loss;
}

function CE_grad(yTrue, yPred) {
  const gradient = [];
  for (let i = 0; i < yPred.length; i++) {
    const t = i + 1 == yTrue ? 1 : 0
    gradient.push(yPred[i] - t);
  }
  return gradient;
}

export { MSE, MSE_grad, CE, CE_grad };
