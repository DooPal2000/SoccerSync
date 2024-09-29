const Posting = require('../models/posting');
const Comment = require('../models/comment');

module.exports.createComment = async (req, res) => {
    const posting = await Posting.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    console.log(req.user._id)
    comment.author = req.user._id;
    posting.comments.push(comment);
    await comment.save();
    await posting.save();
    res.redirect(`/postings/${posting._id}`);
}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    await Posting.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/postings/${id}`);
}