const fixture = require('../models/fixture');
const Fixture = require('../models/fixture');
const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        //await User.deleteMany({ username: username });

        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.flash('success', 'Welcome to YelpCamp!');
        res.redirect('/home');

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};


module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};


module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/home'; // update this line to use res.locals.returnTo now
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {

    req.logout(function (err) {

        if (err) {

            return next(err);

        }

        req.flash('success', 'Goodbye!');

        res.redirect('/home');

    });
}

module.exports.searchFavorite = async (req, res) => {
    const currentUser = req.user;
    const favorites = currentUser.favorites || [];
    console.log(currentUser.favorites);

    res.json(favorites);
};

module.exports.addFavorite = async (req, res) => {
    const currentUser = req.user;
    const fixtureId = parseInt(req.params.fixtureId);
    const fixture = await Fixture.findOne({
        'fixture.fixtureId': fixtureId
    });

    // 이미 즐겨찾기에 있는지 확인
    if (!currentUser.favorites.includes(fixture._id)) {
        currentUser.favorites.push(fixture._id);
        await currentUser.save();
    }
    console.log(currentUser.favorites);
    req.flash('success', `즐겨찾기 추가 완료`);
    res.json({ success: true, message: '즐겨찾기에 추가되었습니다.' });
    // res.json({ success: true, message: '즐겨찾기에 추가되었습니다.' });

};

module.exports.deleteFavorite = async (req, res) => {
    const currentUser = req.user;
    const fixtureId = parseInt(req.params.fixtureId);
    const fixture = await Fixture.findOne({
        'fixture.fixtureId': fixtureId
    });


    // favorites 배열에서 해당 fixture의 _id를 제거
    currentUser.favorites = currentUser.favorites.filter(id => !id.equals(fixture._id));
    await currentUser.save();

    console.log(currentUser.favorites);
    req.flash('success', `즐겨찾기 삭제 완료`);
    res.send(currentUser);
};


