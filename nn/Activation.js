class Activation {
  static relu = {
    activate: (x) => {
      return x >= 0 ? x : 0;
    },
    der: (x) => {
      return x >= 0 ? 1 : 0;
    },
  };

  static leakyRelu = {
    activate: (x) => {
      return x >= 0 ? x : x / 1000;
    },
    der: (x) => {
      return x >= 0 ? 1 : 1 / 1000;
    },
  };

  static sigmoid = {
    activate: (x) => {
      return 1 / (1 + Math.exp(-x));
    },
    der: (x) => {
      const s = Activation.sigmoid.activate(x);
      return s * (1 - s);
    },
  };

  static linear = {
    activate: (x) => {
      return x;
    },
    der: (x) => {
      return 1;
    },
  };
}

export default Activation;
