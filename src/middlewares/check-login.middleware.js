var jwt = require("jsonwebtoken");
const { User } = require("../database/sequelize");

const getUserFromToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw Error("You must be log in first");
    }

    const accessToken = bearerToken.split(" ")[1];

    const data = jwt.verify(accessToken, "secret_key");

    const currUser = await User.findOne({
      where: {
        email: data.email,
      },
      raw: true,
    });

    return currUser;
  } catch (error) {
    return next(error);
  }
};

const checkLoginMiddleware = async (req, res, next) => {
  try {
    const currUser = await getUserFromToken(req, res, next);

    if (!currUser) {
      throw Error("You must be login");
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const checkLoginAdmin = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    console.log("a");
    if (!bearerToken) {
      console.log("🚀 ~ file: check-login.middleware.js:48 ~ checkLoginAdmin ~ bearerToken:", bearerToken)
      throw Error("You must be log in first");
    }

    const accessToken = bearerToken.split(" ")[1];
    const data = jwt.verify(accessToken, "secret_key");

    const currUser = await User.findOne({
      where: {
        email: data.email,
      },
      raw: true,
    });
    if (currUser.role !== 1) {
      throw Error("Bạn không có quyền sử dụng chức năng này");
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
const checkLoginEmployee = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw Error("You must be log in first");
    }

    const accessToken = bearerToken.split(" ")[1];
    const data = jwt.verify(accessToken, "secret_key");

    const currUser = await User.findOne({
      where: {
        email: data.email,
      },
      raw: true,
    });
    if (currUser.role !== "2") {
      throw Error("ban khong phai nhan vien");
    }
    return currUser;
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  checkLoginMiddleware,
  getUserFromToken,
  checkLoginAdmin,
  checkLoginEmployee,
};
