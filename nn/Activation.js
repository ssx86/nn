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
      const s = Activation.softmax.activate(x); // 计算Softmax激活函数
      const n = s.length;
      const jacobian = new Array(n * n).fill(0); // 创建Jacobian矩阵
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i === j) {
            jacobian[i * n + j] = s[i] * (1 - s[i]); // 对角线上的元素
          } else {
            jacobian[i * n + j] = -s[i] * s[j]; // 非对角线上的元素
          }
        }
      }
      return jacobian; // 返回Jacobian矩阵
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
const res = Activation.softmax.activate([1, 2, 3]);
console.log(res);
export default Activation;
