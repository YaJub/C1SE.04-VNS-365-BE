const { DataTypes, Model } = require("sequelize");

const specialtyModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      dishId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dishName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      mainIngredients: {
        type: DataTypes.STRING(255),
        field: "main_ingredients", // Sử dụng 'main_ingredients' cho tên trường trong DB
      },
      cookingInstructions: {
        type: DataTypes.TEXT,
        field: "cooking_instructions", // Sử dụng 'cooking_instructions' cho tên trường trong DB
      },
      origin: {
        type: DataTypes.STRING(255),
      },
      image: {
        type: DataTypes.STRING(255),
      },
      video: {
        type: DataTypes.STRING(255),
      },
      dishCategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "dish_categories", // Tên bảng danh mục món ăn
          key: "dish_category_id",
        },
        field: "dish_category_id", // Sử dụng 'dish_category_id' cho tên trường trong DB
      },
      regionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "regions", // Tên bảng vùng miền
          key: "region_id",
        },
        field: "region_id", // Sử dụng 'region_id' cho tên trường trong DB
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
    specialtyModel,
  };
