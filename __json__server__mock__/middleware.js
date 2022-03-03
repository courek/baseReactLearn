// 写一个中间件来配合 不同api的调用, 因为没有办法让所有的api的是支持 restapi 格式.

// 给json-server 使用中间间的方式
/*
// 
    在packge.json 文件的 命令上配置,运行 json-server的时候进行调用 中间件.
    比如: "start": "react-scripts start json-server __json__server__mock__/db.json --watch --port 8899 --middlewares ./__json__server__mock__/middleware.js",

*/

module.exports = (req, res, next) => {
  // 这里应该加上严谨的判断,只是学习 需要实现就好了
  // 模拟-登录
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "achoo" && req.body.password === "123456") {
      console.log("成功");
      return res.status(200).json({
        user: {
          token: "123678",
        },
      });
    } else {
      console.log("失败");
      return res.status(400).json({ message: "用户名或密码错误" });
    }
  }
  next();
};
