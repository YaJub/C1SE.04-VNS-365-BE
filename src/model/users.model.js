const { DataTypes, Model } = require("sequelize");

const userModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "firstName không được để trống",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "lastName không được để trống",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "email không được để trống",
          },
          isEmail: {
            args: true,
            msg: "email phải viết đúng",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "password không được để trống",
          },
          // len: {
          //   args: [6, 10],
          //   msg: "The password must contain between 2 and 100 characters.", // Error message I want to display
          // },
        },
      },
      isVerified: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue:
          "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  userModel,
};
