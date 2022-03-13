/* craco.config.js */
const CracoLessPlugin = require("craco-less");
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 想要改什么就去看 Ant Design 的样式变量. 主题变量,就可以了.
            modifyVars: {
              "@primary-color": "rgb(0,82,204)",
              "@font-size-base": "16px", // 字体大小
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
