const { Sequelize, Op, DataTypes, Model } = require("sequelize");
const mysql = require("mysql2");
const { userModel } = require("../model/users.model");
const { serviceModel } = require("../model/service.model");
const { ordersModel } = require("../model/orders.model");
const { commentModel } = require("../model/comment.model");
const { specialtyModel } = require("../model/specialtylist.model");

const host = "localhost";
const port = 3306;
const user = "root";
const password = "ăâêô";
const databaseName = "VietnamSpecialty365";

const pool = mysql.createPool({ host, port, user, password });
pool.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);

const sequelize = new Sequelize(databaseName, user, password, {
  host,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    raw: true,
  },
});

const User = userModel(sequelize, DataTypes);
const Service = serviceModel(sequelize, DataTypes);
const Order = ordersModel(sequelize, DataTypes);
const Comment = commentModel(sequelize, DataTypes);


User.hasMany(Order);
Order.belongsTo(User);

Order.belongsTo(Service);
Service.hasMany(Order);

User.hasMany(Comment);
Comment.belongsTo(User);

Comment.belongsTo(Comment, { foreignKey: "parentId" });
Comment.hasMany(Comment, { foreignKey: "parentId", as: "replies" });

Service.hasMany(Comment);
Comment.belongsTo(Service);

sequelize.sync({
  force: false,
  // alter: true,
});

module.exports = {
  sequelize,
  User,
  Service,
  Order,
  Comment,
};
