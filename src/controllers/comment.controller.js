const { Comment, User } = require("../database/sequelize");
const { getUserFromToken } = require("../middlewares/check-login.middleware");

const createNewComment = async (req, res, next) => {
  try {
    const { content, ServiceId } = req.body;
    const currentUser = await getUserFromToken(req, res, next);

    const newComment = await Comment.create({
      content,
      UserId: currentUser.id,
      ServiceId,
    });

    return res.json({
      data: {
        newComment,
      },
      message: "Bình luận thành công",
    });
  } catch (error) {
    next(error);
  }
};

const replyComment = async (req, res, next) => {
  try {
    console.log("here");
    const { content, ServiceId } = req.body;
    const { parentCommentId } = req.params;
    const currentUser = await getUserFromToken(req, res, next);

    const newReply = await Comment.create({
      content,
      UserId: currentUser.id,
      parentId: parentCommentId,
      ServiceId,
    });

    return res.json({
      data: {
        newReply,
      },
      message: "Bình luận thành công",
    });
  } catch (error) {
    next(error);
  }
};

const getAllCommentsOnPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const allCommentsOnPost = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["avatar", "email"],
        },
        {
          model: Comment,
          as: "replies",
          include: { model: User, attributes: ["avatar", "email"] },
        },
      ],
      where: {
        ServiceId: postId,
      },
    });

    return res.json({
      data: {
        allCommentsOnPost,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewComment,
  replyComment,
  getAllCommentsOnPost,
};
