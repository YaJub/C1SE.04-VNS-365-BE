const serviceModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Service",
    {
      nameService: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priceService: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  serviceModel,
};
