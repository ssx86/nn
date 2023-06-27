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

export { MSE, MSE_grad };
