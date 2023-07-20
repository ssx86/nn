import fs from "fs";
import path from "path";

import Jimp from "jimp";

import ConNetwork from "../convolution/functions.js";
import DataProvider from "./DataProvider.js";

class NumberRecognizationDataProvider extends DataProvider {
  judgeFunction = DataProvider.JudgeFunctions.function_judge_convolution;

  kernels = [
    [
      [1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
    ],
    [
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ];
  convo_shape = [
    { action: "convolution" },
    { action: "polling", strategy: "max" },
    { action: "convolution" },
    { action: "polling", strategy: "max" },
    { action: "convolution" },
    { action: "polling", strategy: "max" },
  ];
  is_convolution = true;

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

  async prepare() {
    let singleSize = this.initSize[0] * this.initSize[1]
    let count = 1
    this.convo_shape.forEach(option => {
      if (option.action == 'polling') {
        singleSize = Math.ceil(singleSize / Math.floor(this.kernels[0].length / 2) / Math.floor(this.kernels[0].length / 2))
      } else if (option.action == 'convolution') {
        count *= this.kernels.length
      }
    })
    this.convolution_input_size = singleSize * count


    const fileList = await this.getFileList(path.join("data", "train"));

    for (const [number, filePaths] of Object.entries(fileList)) {
      const tValue = Number.parseInt(number);
      // if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(tValue)) continue;
      // if (![0, 1, 2, 3].includes(tValue)) continue;
      for (const filePath of filePaths) {
        if (filePath.endsWith(".cache.json")) continue;


        console.log(filePath);
        const image = (await Jimp.read(filePath)).resize(64, 64).grayscale();

        const bitArray = new Array(image.getHeight());
        for (let i = 0; i < bitArray.length; i++) {
          bitArray[i] = new Array(image.getWidth()).fill(0);
        }

        image.scan(
          0,
          0,
          image.bitmap.width,
          image.bitmap.height,
          function (x, y, idx) {
            bitArray[y][x] = 256 - this.bitmap.data[idx + 0];
          }
        );


        this.dataSet.push(
          this.createDataItem(bitArray, tValue, { extra: { filePath } })
        );
      }
    }
  }

  getFeatureFns() {
    const fns = [];
    for (let i = 0; i < this.convolution_input_size; i++) {
      fns.push(({ data }) => data[i]);
    }
    return fns;
  }

  initSize = [64, 64]
  convolution_input_size = null
}

export default NumberRecognizationDataProvider;
