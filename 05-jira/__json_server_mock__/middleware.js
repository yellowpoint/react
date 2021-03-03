module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "huang" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: 22222,
        },
      });
    } else {
      return res.status(400).json({
        msg: "用户名或者密码错误",
      });
    }
  }
  next();
};
