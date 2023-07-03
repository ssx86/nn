const Activation = {
  relu: {
    activate: (x) => {
      return x >= 0 ? x : 0;
    },
    der: (x) => {
      return x >= 0 ? 1 : 0;
    },
  },

  leakyRelu: {
    activate: (x) => {
      return x >= 0 ? x : x / 100;
    },
    der: (x) => {
      return x >= 0 ? 1 : 1 / 100;
    },
  },

  sigmoid: {
    activate: (x) => {
      return 1 / (1 + Math.exp(-x));
    },
    der: (x) => {
      const s = Activation.sigmoid.activate(x);
      return s * (1 - s);
    },
  },

  softmax: {
    activate: (x) => {
      const maxNum = Math.max(...x);
      x = x.map((a) => a - maxNum);
      const exps = x.map(Math.exp); // 计算指数
      const sumExp = exps.reduce((sum, exp) => sum + exp); // 计算指数之和
      return exps.map((exp) => exp / sumExp); // 返回归一化概率分布向量
    },
    der: (x) => {
      const n = x.length;
      const s = Activation.softmax.activate(x);
      const jacobian = new Array(n);

      for (let i = 0; i < n; i++) {
        jacobian[i] = new Array(n);
        for (let j = 0; j < n; j++) {
          if (i === j) {
            jacobian[i][j] = s[i] * (1 - s[i]);
          } else {
            jacobian[i][j] = -s[i] * s[j];
          }
        }
      }

      return jacobian;
    },
  },

  linear: {
    activate: (x) => {
      return x;
    },
    der: (x) => {
      return 1;
    },
  },
};
export default Activation;
