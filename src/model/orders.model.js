const { DataTypes } = require("sequelize");

const ordersModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Orders",
    {
      unitPrice: {
        type: DataTypes.DECIMAL(10, 3),
      },
      quantity: {
        type: DataTypes.DOUBLE,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 3),
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      note: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  ordersModel,
};
