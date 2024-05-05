const commentModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};

module.exports = {
  commentModel,
};
