import Activation from "../Activation.js";

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
  for (let i = deltaY; i < h - 1 - deltaY; i++) {
    for (let j = deltaX; j < w - 1 - deltaX; j++) {
      newImage[i][j] = convolutional(kernel, image, j, i);
    }
  }
  return newImage;
}

function polling(size, image, centerX, centerY) {
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

// function polling(size, image, centerX, centerY) {
//   const deltaX = (size - 1) / 2;
//   const deltaY = (size - 1) / 2;
//   const left = centerX - deltaX;
//   const top = centerY - deltaY;
//   let sum = 0;
//   for (let i = top; i <= centerY + deltaY; i++) {
//     for (let j = left; j <= centerX + deltaX; j++) {
//       sum += image?.[j]?.[i] ?? 0;
//     }
//   }
//   return sum / size / size;
// }

function getPollingImage(w, h, image) {
  const size = 3;
  const newW = Math.ceil(w / 2);
  const newH = Math.ceil(h / 2);

  const newImage = new Array(newH)
  for (let i = 0; i < newImage.length; i++) {
    newImage[i] = new Array(newW).fill(0)
  }

  const deltaX = (size - 1) / 2;
  const deltaY = (size - 1) / 2;
  for (let i = deltaY; i < h - 1 - deltaY; i += 2) {
    for (let j = deltaX; j < w - 1 - deltaX; j += 2) {
      newImage[(i - 1) / 2][(j - 1) / 2] = polling(size, image, j, i);
    }
  }
  return newImage;
}

class ConNode {
  static uuid = 0;
  __id;

  data;
  inputKernel;
  prevNode;

  constructor(prevNode, kernel) {
    ConNode.uuid += 1;
    this.__id = ConNode.uuid;

    this.inputKernel = kernel;
    this.prevNode = prevNode;
  }
}

class ConLayer {
  nodes = [];
  option;

  constructor(option) {
    this.option = option;
  }
  addNode(node) {
    this.nodes.push(node);
  }

  forward(image) {
    for (const node of this.nodes) {
      const prevNode = node.prevNode;
      if (this.option.action == "convolution") {
        const w = prevNode.data[0].length;
        const h = prevNode.data.length;
        node.data = getConvolutionalImage(
          w,
          h,
          node.inputKernel,
          node.prevNode.data
        );
      } else if (this.option.action == "polling") {
        const w = prevNode.data[0].length;
        const h = prevNode.data.length;
        node.data = getPollingImage(w, h, node.prevNode.data);
      } else {
        // input
        node.data = image;
      }
    }
  }

  getOutput() {
    const res = [];
    this.nodes.forEach((node) => {
      node.data.forEach((line) => {
        res.push(...line);
      });
    });
    return res;
  }
}

class ConNetwork {
  layers = [];
  kernels;
  constructor(options, kernels) {
    this.options = options;
    this.kernels = kernels;

    const inputLayer = new ConLayer({ action: "input" });
    inputLayer.addNode(new ConNode());
    this.layers.push(inputLayer);

    for (const option of options) {
      const newLayer = new ConLayer(option);
      const prevLayer = this.layers[this.layers.length - 1];

      if (option.action == "convolution") {
        for (const node of prevLayer.nodes) {
          for (const kernel of this.kernels) {
            const newNode = new ConNode(node, kernel);
            newLayer.addNode(newNode);
          }
        }
      } else if (option.action == "polling") {
        for (const node of prevLayer.nodes) {
          const newNode = new ConNode(node);
          newLayer.addNode(newNode);
        }
      }
      this.layers.push(newLayer);
    }
  }

  forward(image) {
    this.layers[0].nodes[0].data = image;
    for (let i = 1; i < this.layers.length; i++) {
      this.layers[i].forward();
    }
    return this.layers[this.layers.length - 1].getOutput();
  }
}

export default ConNetwork;
