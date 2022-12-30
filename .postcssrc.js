// 所有的postcss的插件都是一个函数
const pxToRem = require("postcss-pxtorem");
module.exports = {
  plugins: [
    pxToRem({
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ["*"], // 所有属性都转成rem
      exclude: "github-markdown",
    }),
  ],
};
