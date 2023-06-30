const { DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/database");
// const User = require("./userModel");
// const Like = require("./likeModel");

class Post extends Model {}

Post.init(
  {
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      // define custom error messages in future
    },
  },
  { sequelize, name: "Post", timestamps: true }
);

// Post.hasMany(Comment, { foreignKey: "postId" });
// Post.hasMany(Like, { foreignKey: "postId" });

// Post.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Post;
