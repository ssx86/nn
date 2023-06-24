function MSE(t, Y) {
  const diff = Y - t;
  return (diff * diff) / 2;
}

function MSE_grad(t, Y) {
  const diff = Y - t;
  return diff;
}

function relu(x) {
  return Math.max(x, 0);
}
export { relu, MSE, MSE_grad };
