const { DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/database");
const Post = require("./postModel");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    musicGenres: {
      type: DataTypes.STRING,
    },
    socialMedia: {
      type: DataTypes.STRING,
    },
    education: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasMany(Post, { foreignKey: "userId", as: "posts" });

module.exports = User;
