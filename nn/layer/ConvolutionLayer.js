import Activation from "../Activation.js";
import ConNode from "../node/ConNode.js";
import LayerBase from "./LayerBase.js";

class ConvolutionLayer extends LayerBase {
  nodes = [];
  option;
  kernels;

  constructor(kernels) {
    super()
    this.kernels = kernels
  }


  buildLayer(preLayer) {
    for (const left of preLayer.nodes) {
      for (const kernel of this.kernels) {
        const newNode = new ConNode(left, kernel);
        this.connectNode(left, newNode)
        this.addNode(newNode);
      }
    }
  }


  forward() {
    for (const node of this.nodes) {
      const prevNode = node.prevNode;
      const w = prevNode.data[0].length;
      const h = prevNode.data.length;
      node.data = getConvolutionalImage(
        w,
        h,
        node.kernel,
        node.prevNode.data
      );

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

export default ConvolutionLayer;
