const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { User } = require("../database/sequelize");

const { Op, Error } = require("sequelize");
const { getUserFromToken } = require("../middlewares/check-login.middleware");

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (password === "") {
      throw new Error("Mời bạn điền đầy đủ thông tin");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    console.log("🚀 ~ file: users.controller.js:16 ~ createUser ~ hash:", hash);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      role,
    });

    const { password: anotherPassword, ...result } = newUser.get({
      plain: true,
    });

    return res.json({
      data: {
        result,
      },
      message: "Create user success",
    });
  } catch (error) {
    return next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const currUser = await User.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    if (!currUser) {
      throw new Error("Email không đúng");
    }

    const isValidPassword = bcrypt.compareSync(password, currUser.password);

    if (!isValidPassword) {
      throw new Error("Password sai");
    }

    if (currUser.status === 2) {
      throw new Error("Bạn đã bị chặn");
    }
    const accessToken = jwt.sign(
      {
        id: currUser.id,
        email: currUser.email,
        role: currUser.role,
      },
      "secret_key",
      { expiresIn: "60m" }
    );

    return res.json({
      accessToken,
      avatar: currUser.avatar,
      role: currUser.role,
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      isVerified,
      avatar,
      phoneNumber,
      address,
      role,
    } = req.body;
    console.log(
      "🚀 ~ file: users.controller.js:136 ~ updateUser ~ avatar:",
      avatar
    );
    const currUser = await getUserFromToken(req, res, next);
    if (!currUser) {
      throw new Error("User not found");
    }
    const updateUser = await User.update(
      {
        firstName,
        lastName,
        isVerified,
        avatar,
        phoneNumber,
        address,
        role,
      },
      {
        where: {
          id: currUser.id,
        },
      }
    );

    return res.json({
      data: {
        updateUser,
      },
      message: "Cập nhật thành công",
    });
  } catch (error) {
    return next(error);
  }
};

const updateUserforAdmin = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      isVerified,
      avatar,
      phoneNumber,
      address,
      role,
    } = req.body;
    const { id } = req.params;

    const updateUser = await User.update(
      {
        firstName,
        lastName,
        isVerified,
        avatar,
        phoneNumber,
        address,
        role,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.json({
      data: {
        updateUser,
      },
      message: "Cập nhật thành công",
    });
  } catch (error) {
    return next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const { page, perPage } = req.query;

    const offset = (+page - 1) * +perPage;
    const limit = +perPage;

    const allUsers = await User.findAndCountAll({
      offset,
      limit,
      where: {
        role: {
          [Op.ne]: 1,
        },
      },
      order: [["createdAt", /*"DESC"*/ "ASC"]],
    });

    const { count } = allUsers;
    const totalPage = Math.ceil(count / perPage);
    return res.json({
      data: {
        allUsers: allUsers.rows,
        totalPage,
        page,
        perPage,
        total: count,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getDetailUserforAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getOneUser = await User.findOne({
      where: {
        id: id,
      },
    });
    return res.json({
      data: {
        getOneUser,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getDetailUser = async (req, res, next) => {
  try {
    const currUser = await getUserFromToken(req, res, next);
    if (!currUser) {
      throw new Error("User not found");
    }
    const detailUser = await User.findOne({
      where: {
        email: currUser.email,
      },
      raw: true,
    });

    return res.json({
      data: {
        detailUser,
      },
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  signIn,
  createUser,
  getAllUser,
  updateUser,
  updateUserforAdmin,
  getDetailUserforAdmin,
  getDetailUser,
};
