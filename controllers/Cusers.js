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

    // favorites 배열의 fixtureId를 사용하여 Fixture를 조회
    const favorites = await Fixture.find({
        'fixture.fixtureId': { $in: currentUser.favorites }
    });
    const favoriteFixtureIds = currentUser.favorites;


    res.json(favoriteFixtureIds);
};

module.exports.addFavorite = async (req, res) => {
    const currentUser = req.user;
    const fixtureId = parseInt(req.params.fixtureId);

    if (!currentUser.favorites.includes(fixtureId)) {
        currentUser.favorites.push(fixtureId);
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

    currentUser.favorites = currentUser.favorites.filter(id => id !== fixtureId);
    await currentUser.save();

    // favorites 배열에서 해당 fixture의 _id를 제거
    currentUser.favorites = currentUser.favorites.filter(id => !id.equals(fixture._id));
    await currentUser.save();

    console.log(currentUser.favorites);
    req.flash('success', `즐겨찾기 삭제 완료`);
    res.send(currentUser);
};


