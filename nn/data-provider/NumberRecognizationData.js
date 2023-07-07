import fs from "fs";
import path from "path";

import Jimp from "jimp";

import ConNetwork from "../convolution/ConNetwork.js";
import DataProvider from "./DataProvider.js";

class NumberRecognizationDataProvider extends DataProvider {
  useCache = true
  judgeFunction = DataProvider.JudgeFunctions.function_judge_convolution;
  isPrepared = false;

  kernels = [
    [
      [1, -1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
    ],
    [
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ],
    [
      [-1, 1, -1],
      [-1, 1, -1],
      [-1, 1, -1],
    ],
    [
      [-1, -1, -1],
      [1, 1, 1],
      [-1, -1, -1],
    ],
  ];
  convo_shape = [
    { action: "convolution" },
    { action: "polling", strategy: "avg" },
    { action: "convolution" },
    { action: "polling", strategy: "max" },
    { action: "polling", strategy: "avg" },
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
    if (this.isPrepared) return;

    const network = new ConNetwork(this.convo_shape, this.kernels);

    const fileList = await this.getFileList(path.join("data", "train"));

    for (const [number, filePaths] of Object.entries(fileList)) {
      const tValue = Number.parseInt(number);
      // if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(tValue)) continue;
      if (![0, 1, 2, 3, 4, 5].includes(tValue)) continue;
      for (const filePath of filePaths) {
        if (filePath.endsWith(".cache.json")) continue;
        const cacheKey = filePath + ".cache.json";
        let data;

        if (this.useCache && fs.existsSync(cacheKey)) {
          const buffer = fs.readFileSync(cacheKey);
          data = JSON.parse(buffer.toString());
          console.log(filePath, "cached");
        } else {
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

          data = network.forward(bitArray);
          fs.writeFileSync(cacheKey, JSON.stringify(data));
        }

        this.dataSet.push(
          this.createDataItem(data, tValue, { extra: { filePath } })
        );
      }
    }
    this.isPrepared = true;
  }

  getFeatureFns() {
    const fns = [];
    for (let i = 0; i < this.convolution_input_size; i++) {
      fns.push(({ data }) => data[i]);
    }
    return fns;
  }


  convolution_input_size = 1024;
}

export default NumberRecognizationDataProvider;
