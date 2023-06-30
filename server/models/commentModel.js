// const { DataTypes, Model } = require("sequelize");
// const sequelize = require("../utils/database");
// const Post = require("./postModel");
// const User = require("./userModel");

// class Comment extends Model {}

// Comment.init(
//   {
//     text: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "Comment",
//     timestamps: true,
//   }
// );

// Comment.belongsTo(Post, { foreignKey: "postId" });
// Comment.belongsTo(User, { foreignKey: "userId" });

// module.exports = Comment;
