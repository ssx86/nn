import Network from "./Network.js";

import data from "./data.js";
function main() {
  // const data = [];
  // for (let i = 0; i < 100; i++) {
  //   const a = 0.5 * 100,
  //     b = 0.5 * 100;
  //   data.push([a, b, a * b + 3]);
  // }
  // console.log(data);

  const network = new Network();

  // for (let i = 1; i < 10000; i++) {
  //   const res = data.map((item) => {
  //     network.propagate(item);
  //     network.backward();
  //   });
  // }
  for (let i = 1; i, 10000; i++) {
    network.propagate(data[0]);
    network.backward();
    // console.table([network.output]);
  }
}

main();
