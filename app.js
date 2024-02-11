const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const axios = require('axios');

// const campgrounds = require('./routes/camgprounds.js');
// const reviews = require('./routes/reviews.js');


require('dotenv').config({ path: './.env' });


mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((e) => {
    console.log("Connection failed!");
    console.error("Connection failed:", e);
  });



const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/scripts", express.static(__dirname + "/scripts"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



// const validateCampground = (req, res, next) => {
//   const { error } = campgroundSchema.validate(req.body);
//   if (error) {
//       const msg = error.details.map(el => el.message).join(',')
//       throw new ExpressError(msg, 400)
//   } else {
//       next();
//   }
// }

// const validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body);
//   if (error) {
//       const msg = error.details.map(el => el.message).join(',')
//       throw new ExpressError(msg, 400)
//   } else {
//       next();
//   }
// }

// app.use('/campgrounds',campgrounds);
// app.use('/campgrounds/:id/reviews',reviews)


app.get('/', (req, res) => {
  res.render('home')
});


app.get('/fixture/:id', catchAsync(async(req,res) => {
  let { from, to, season } = req.query;
  const leagueId = req.params.id;
  let fixtureDB;

  
  // 현재 날짜 정보 가져오기
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요

  // from, to 값이 없는 경우 현재 날짜 정보 사용
  if (!from) {
    from = `${currentYear}-${currentMonth}-01`;
  }
  if (!to) {
    // 해당 월의 마지막 날짜 구하기
    const lastDay = new Date(currentYear, currentMonth, 0).getDate();
    to = `${currentYear}-${currentMonth}-${lastDay}`;
  }
  if (!season) {
    season = String(currentYear);
  }


const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  params: {
    league: leagueId,
    season: season,
    from: '2024-03-01',
    to: '2024-03-31'
  },
  headers: {
    'X-RapidAPI-Key': process.env.RapidApiKey,
    'X-RapidAPI-Host': 'api-football-v1.pf.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data.response);
  fixtures = response.data.response;
} catch (error) {
	console.error(error);
}  

res.render('fixture', {leagueId , fixtures})
}));

// app.get('/', catchAsync(async (req, res) => {
//     const campgrounds = await Campground.find({});
//     res.render('campgrounds/index', { campgrounds })
//     }));
    
//     app.get('/new', (req, res) => {
//     res.render('campgrounds/new');
// })
    
    
// app.post('/', validateCampground, catchAsync(async (req, res, next) => {
// // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
// const campground = new Campground(req.body.campground);
// await campground.save();
// res.redirect(`/campgrounds/${campground._id}`)
// // }));

// app.post('/', catchAsync(async (req, res, next) => {
// // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
// const campground = new Campground(req.body.campground);
// await campground.save();
// res.redirect(`/campgrounds/${campground._id}`)
// }));

// app.get('/:id', catchAsync(async (req, res,) => {
// const campground = await Campground.findById(req.params.id).populate('reviews');
// res.render('campgrounds/show', { campground });
// }));

// app.get('/:id/edit', catchAsync(async (req, res) => {
// const campground = await Campground.findById(req.params.id)
// res.render('campgrounds/edit', { campground });
// }))

// app.put('/:id', validateCampground, catchAsync(async (req, res) => {
// const { id } = req.params;
// const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
// res.redirect(`/campgrounds/${campground._id}`)
// }));

// app.delete('/:id', catchAsync(async (req, res) => {
// const { id } = req.params;
// await Campground.findByIdAndDelete(id);
// res.redirect('/campgrounds');
// }));
    


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


app.listen(3000, () => {
  console.log('Serving on port 3000')
})