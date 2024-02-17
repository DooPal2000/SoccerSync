const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');


const { fixtureSchema } = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const axios = require('axios');
const Fixture = require('./models/fixture.js');

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



const validateFixture = (req, res, next) => {
  const { error } = fixtureSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}

app.get('/', (req, res) => {
  res.render('home')
});



app.get('/fixtures/:id', catchAsync(async (req, res) => {
  const leagueId = req.params.id;
  let leagueName;
  let fixtures;

  // 현재 날짜 정보 가져오기
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const seasonsToSave = [currentYear, currentYear - 1, currentYear - 2];


  const { year, month } = req.query;

  if (!year || !month) {

    await Fixture.deleteMany({ 'league.id': leagueId, });

    for (const season of seasonsToSave) {
      const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: {
          league: leagueId,
          season: season,
        },
        headers: {
          'X-RapidAPI-Key': process.env.RapidApiKey,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data.response);
        fixtures = response.data.response;


        for (let fixture of fixtures) {
          fixture.fixture = {
            ...fixture.fixture,
            fixtureId: fixture.fixture.id,
          };
          const newFixture = new Fixture(fixture);
          await newFixture.save();
          leagueName = newFixture.league.name;
        }

      } catch (error) {
        console.error(`Error fetching data for season ${season}:`, error);
      }
    }
    fixtures = fixtures
      .filter(fixture => {
        const fixtureMonth = new Date(fixture.fixture.timestamp * 1000).getMonth();
        return fixtureMonth === currentMonth;
      });

      if (fixtures.length > 0) {
        fixtures.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);
      }      

    res.render('fixture', { leagueId, leagueName, fixtures })

    // const options = {
    //   method: 'GET',
    //   url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    //   params: {
    //     league: leagueId,
    //     season: season,
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': process.env.RapidApiKey,
    //     'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    //   }
    // };
    // try {
    //   const response = await axios.request(options);
    //   console.log(response.data.response);
    //   fixtures = response.data.response;
    // } catch (error) {
    //   console.error(error);
    // }

    // await Fixture.deleteMany({ 'league.id': leagueId })
    // for (let fixture of fixtures) {
    //   fixture.fixture = {
    //     ...fixture.fixture,
    //     fixtureId: fixture.fixture.id,
    //   };
    //   const newFixture = new Fixture(fixture);
    //   await newFixture.save();
    //   leagueName = newFixture.league.name;
    // }

    // fixtures = fixtures.filter(fixture => {
    //   const fixtureMonth = new Date(fixture.fixture.timestamp * 1000).getMonth();
    //   return fixtureMonth === currentMonth;
    // })

    // res.render('fixture', { leagueId, leagueName, fixtures })

  } else {
    // year와 month 파라미터가 있으면 해당 월의 데이터만 반환
    const startDate = new Date(year, month - 1); // 월은 0부터 시작하므로 month - 1
    const endDate = new Date(year, month); // 다음 달의 첫 날 (이 날짜는 포함되지 않음)

    // 날짜 범위를 timestamp로 변환
    const startTimestamp = startDate.getTime() / 1000;
    const endTimestamp = endDate.getTime() / 1000;
    const fixtures = await Fixture.find({
      'league.id': leagueId,
      'fixture.timestamp': {
        $gte: startTimestamp,
        $lte: endTimestamp
      }
    })

    if (fixtures.length > 0) {
      fixtures.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);
    }      

    res.json(fixtures);
  }

}));




app.get('/fixture/:id/month'), catchAsync(async (req, res) => {







})


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