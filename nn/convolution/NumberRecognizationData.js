import fs from "fs";
import path from "path";

import Jimp from "jimp";

import config from "../config.js";
import ConNetwork from "./ConNetwork.js";

async function getFileList(baseDir) {
  const fileList = {};
  const names = fs.readdirSync(baseDir);

  for (const name of names) {
    const numberDir = path.join(baseDir, name);
    if (!fs.statSync(numberDir).isDirectory()) continue;

    const number = name.split("_")[0];
    fileList[number] = fileList[number] || [];

    const files = fs.readdirSync(numberDir);
    for (const fileName of files) {
      const fullPath = path.join(numberDir, fileName);
      if (fs.statSync(fullPath).isDirectory()) continue;
      fileList[number].push(fullPath);
    }
  }
  return fileList;
}

async function prepareData() {
  const network = new ConNetwork(config.convo_shape, config.kernels);

  const fileList = await getFileList(path.join("data", "train"));

  const res = [];
  for (const [number, filePaths] of Object.entries(fileList)) {
    for (const filePath of filePaths) {
      const image = (await Jimp.read(filePath)).resize(155, 135);

      const bitArray = new Array(image.getHeight()).fill(
        new Array(image.getWidth()).fill(0)
      );

      for (let i = 0; i < image.getHeight(); i++) {
        for (let j = 0; j < image.getWidth(); j++) {
          bitArray[i][j] = image.getPixelColor(j, i);
        }
      }

      const output = network.forward(bitArray);
      res.push(output);
    }
  }
}

const data = await prepareData();

export default data;
