import fs from 'fs';
import path from 'path';

import Jimp from 'jimp'

import Activation from '../nn/Activation.js'

const kernels = [
  [
    [1, -1, 1],
    [-1, 1, -1],
    [1, -1, 1],
  ],
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
  ]
]

const readData = async function () {
  const baseDir = path.join('data', 'train')
  const names = fs.readdirSync(baseDir)
  for (const name of names) {
    const numberDir = path.join(baseDir, name)
    const files = fs.readdirSync(numberDir)
    for (const fileName of files) {
      const fullPath = path.join(numberDir, fileName)
      const layer1Data = await layer1(fullPath, fileName)

    }
  }
}


async function layer1(fullPath, fileName) {
  const image = (await Jimp.read(fullPath)).resize(155, 135)

  return kernels.forEach((kernel, i) => {
    const buffer = getConvolutionalImage(image.getHeight(), image.getWidth(), kernel, image)
    fs.writeFileSync(path.join('data', 'middle', fileName + `layer1_${i}.data`), Buffer.from(buffer))
  })
}



function convolutional(w, h, kernel, image, centerX, centerY) {
  const deltaX = (kernel[0].length - 1) / 2
  const deltaY = (kernel.length - 1) / 2
  const left = centerX - deltaX
  const top = centerY - deltaY
  let sum = 0
  for (let i = top; i <= centerY + deltaY; i++) {
    for (let j = left; j <= centerX + deltaX; j++) {
      sum += kernel[i - top][j - left] * image[j + i * w]
    }
  }
  return Activation.relu.activate(sum)
}

function getConvolutionalImage(w, h, kernel, image) {
  const newImage = new Array(h).fill(new Array(w).fill(0))
  const deltaX = (kernel[0].length - 1) / 2
  const deltaY = (kernel.length - 1) / 2
  const buffer = Array.from(image.bitmap.data)
  for (let i = deltaY; i < h - deltaY; i++) {
    for (let j = deltaX; j < w - deltaX; j++) {
      newImage[i][j] = convolutional(w, h, kernel, buffer, i, j)
    }
  }
  return newImage
}
const data = await readData()

export default data