const { User } = require("../database/sequelize");

const checkSignUp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const allUser = await User.findAll();
    for (let key of allUser) {
      if (key.email === email) {
        throw Error("email bị lặp");
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkSignUp,
};
