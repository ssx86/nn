
function convolutional(kernel, image, centerX, centerY) {
  const deltaX = (kernel[0].length - 1) / 2;
  const deltaY = (kernel.length - 1) / 2;
  const left = centerX - deltaX;
  const top = centerY - deltaY;
  let sum = 0;
  for (let i = top; i <= centerY + deltaY; i++) {
    for (let j = left; j <= centerX + deltaX; j++) {
      sum += kernel[i - top][j - left] * image[i][j];
    }
  }
  // return Activation.relu.activate(sum);
  return sum;
}

function getConvolutionalImage(w, h, kernel, image) {

  const newImage = new Array(h)
  for (let i = 0; i < newImage.length; i++) {
    newImage[i] = new Array(w).fill(0)
  }

  const deltaX = (kernel[0].length - 1) / 2;
  const deltaY = (kernel.length - 1) / 2;
  for (let i = deltaY; i < h - deltaY; i++) {
    for (let j = deltaX; j < w - deltaX; j++) {
      newImage[i][j] = convolutional(kernel, image, j, i);
    }
  }
  return newImage;
}

function pollingMax(size, image, centerX, centerY) {
  const deltaX = (size - 1) / 2;
  const deltaY = (size - 1) / 2;
  const left = centerX - deltaX;
  const top = centerY - deltaY;
  let max = 0;
  for (let i = top; i <= centerY + deltaY; i++) {
    for (let j = left; j <= centerX + deltaX; j++) {
      max = Math.max(max, image?.[j]?.[i] ?? 0);
    }
  }
  return max;
}

function pollingAvg(size, image, centerX, centerY) {
  const deltaX = (size - 1) / 2;
  const deltaY = (size - 1) / 2;
  const left = centerX - deltaX;
  const top = centerY - deltaY;
  let sum = 0;
  for (let i = top; i <= centerY + deltaY; i++) {
    for (let j = left; j <= centerX + deltaX; j++) {
      sum += image?.[j]?.[i] ?? 0;
    }
  }
  return sum / size / size;
}

function getPollingImage(w, h, image, strategy) {
  const pollingFns = {
    avg: pollingAvg,
    max: pollingMax,
  }
  const size = 5;
  const newW = Math.ceil(w / 2);
  const newH = Math.ceil(h / 2);

  const newImage = new Array(newH)
  for (let i = 0; i < newImage.length; i++) {
    newImage[i] = new Array(newW).fill(0)
  }

  const deltaX = (size - 1) / 2;
  const deltaY = (size - 1) / 2;
  for (let i = deltaY; i < h; i += 2) {
    for (let j = deltaX; j < w; j += 2) {
      newImage[(i - deltaY) / 2][(j - deltaX) / 2] = pollingFns[strategy](size, image, j, i);
    }
  }
  return newImage;
}



export default {
  getPollingImage,
  getConvolutionalImage
};
