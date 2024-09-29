const posting = require('../models/posting');
const Comment = require('../models/comment');

module.exports.createComment = async (req, res) => {
    const posting = await posting.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    posting.comments.push(comment);
    await comment.save();
    await posting.save();
    res.redirect(`/postings/${posting._id}`);
}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    await posting.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/postings/${id}`);
}