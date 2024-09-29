const Posting = require('../models/posting');

module.exports.index = async (req, res) => {
    const postings = await Posting.find({});
    res.render('postings/index', { postings })
}

module.exports.renderNewForm = (req, res) => {
    res.render('postings/new');
}

module.exports.createPost = async (req, res, next) => {
    // if (!req.body.post) throw new ExpressError('Invalid Posting Data', 400);
    const posting = new Posting(req.body.post);
    posting.author = req.user._id;
    await posting.save();
    req.flash('success', 'Successfully made a new posting');
    res.redirect(`/postings/${posting._id}`)
}

module.exports.showPost = async (req, res,) => {
    // 리뷰에 여러 명을 populate 해야 해서, 주석처리된 부분과 다르게 진행된다. 
    //const posting = await Posting.findById(req.params.id).populate('comments').populate('author');
    const posting = await Posting.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
    //console.log(posting);
    if (!posting) {
        req.flash('error', 'Cannot find that posting!');
        return res.redirect('/postings');
    }
    res.render('postings/show', { posting });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const posting = await Posting.findById(req.params.id);
    if (!posting) {
        req.flash('error', 'Cannot find that posting!');
        return res.redirect('/postings');
    }

    res.render('postings/edit', { posting });
}

module.exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const posting = await Posting.findByIdAndUpdate(id, { ...req.body.post });
    req.flash('success', 'Successfully updated posting!');
    res.redirect(`/postings/${posting._id}`)
}

module.exports.deletePost = async (req, res) => {
    const { id } = req.params;
    await Posting.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted posting')
    res.redirect('/postings');
}