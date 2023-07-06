import fs from "fs";
import path from "path";

import Jimp from "jimp";

import config from "../config.js";
import ConNetwork from "../convolution/ConNetwork.js";
import DataProvider from "./DataProvider.js";



class NumberRecognizationDataProvider extends DataProvider {

  async getFileList(baseDir) {
    const fileList = {};
    const names = fs.readdirSync(baseDir);

    for (const name of names) {
      const numberDir = path.join(baseDir, name);
      if (!fs.statSync(numberDir).isDirectory()) continue;

      const number = Number.parseInt(name.split("_")[0]);
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

  isPrepared = false
  dataSet = []
  async prepare() {
    if (this.isPrepared) return

    const network = new ConNetwork(config.convo_shape, config.kernels);

    const fileList = await this.getFileList(path.join("data", "train"));

    const res = [];
    for (const [number, filePaths] of Object.entries(fileList)) {
      const tValue = Number.parseInt(number)
      if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(tValue)) continue
      // if (![0, 1, 2, 3, 4].includes(tValue)) continue
      for (const filePath of filePaths) {
        console.log(filePath)
        const image = (await Jimp.read(filePath)).resize(64, 64).grayscale();

        const bitArray = new Array(image.getHeight())
        for (let i = 0; i < bitArray.length; i++) {
          bitArray[i] = new Array(image.getWidth()).fill(0)
        }


        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
          bitArray[y][x] = 256 - this.bitmap.data[idx + 0];
        });


        const data = network.forward(bitArray);
        if (data.length != 1024) {
          console.log({ data })
        }
        res.push({ data, tValue });
      }
    }
    this.dataSet = res.sort(() => Math.random() - 0.5)
    this.isPrepared = true
  }

  async getTestDataSet() {
    return this.dataSet.slice(0, Math.floor(this.dataSet.length * 0.7))
  }
  async getTrainDataSet() {
    return this.dataSet.slice(Math.floor(this.dataSet.length * 0.7))
  }
}

export default NumberRecognizationDataProvider;