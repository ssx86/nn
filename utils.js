function loss(res) {
  let sum = 0;
  res.forEach((r) => {
    const diff = r.value - r.item[2];
    sum += diff * diff;
  });
  return sum / res.length;
}

function loss_grad(X, res) {
  let sum = 0;
  res.forEach((r) => {
    const diff = Math.abs(r.value - r.item[2]);
    sum == diff * diff;
  });
  return sum / res.length;
}

function relu(x) {
  return Math.max(x, 0);
}
export { relu, loss, loss_grad };
