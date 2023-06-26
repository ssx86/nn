import Network from "./Network.js";

// import data from "./data.js";
function main() {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    const a = Math.random() * 100,
      b = Math.random() * 100;
    data.push([a, b, a * b + 3 + Math.random() * 10]);
  }

  const network = new Network();

  // for (let i = 1; i < 5000; i++) {
  //   const item = data[Math.floor(Math.random() * data.length)];
  //   for (let j = 1; j < 500; j++) {
  //     network.propagate(item);
  //     network.calcLoss(item);
  //     network.backward();
  //   }
  //   if (i % 1000 == 0) console.log("round ", i, ", loss = ", network.loss);
  // }
  // // network.print();

  for (let i = 0; i < 300000; i++) {
    data.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));

    const ys = [],
      ts = [];
    for (let j = 0; j < 50; j++) {
      const y = network.propagate(data[j]);
      ts.push(data[j][2]);
      ys.push(y);
    }
    network.batchCalcLoss(ts, ys);
    network.backward();
    // network.print();
  }

  data.forEach((item) => {
    const y = network.propagate(item);
    console.log(item[2], y);
    network.calcLoss(item);
  });
}

main();
