const { postingSchema, commentSchema } = require('./schemas.js');
const  ExpressError = require('./utils/ExpressError.js');
const Posting = require('./models/posting.js');
const Comment = require('./models/comment.js');

module.exports.isLoggedIn = (req, res, next) => {
    console.log("Req.user...", req.user)
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', '로그인 해 주세요.')
        return res.redirect('/login');
    }
    next();
}


module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validatePost = (req, res, next) => {
    const { error } = postingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const posting = await Posting.findById(id);
    if (!posting.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to to that!');
        return res.redirect(`/posting/${id}`);
    }
    next();
}

module.exports.isCommentAuthor = async (req, res, next) => {
    const { id, commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to to that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
