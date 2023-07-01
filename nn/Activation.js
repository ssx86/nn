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
      // 计算 Jacobian 矩阵
      var jacobian = [];
      for (var i = 0; i < s.length; i++) {
        var row = [];
        for (var j = 0; j < s.length; j++) {
          if (i === j) {
            row.push(s[i] * (1 - s[i]));
          } else {
            row.push(-s[i] * s[j]);
          }
        }
        jacobian.push(row);
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
