const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const campgrounds = require('./routes/camgprounds.js');
const reviews = require('./routes/reviews.js');


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

app.use('/campgrounds',campgrounds);
app.use('/campgrounds/:id/reviews',reviews)


app.get('/', (req, res) => {
  res.render('home')
});

app.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
    }));
    
    app.get('/new', (req, res) => {
    res.render('campgrounds/new');
})
    
    
// app.post('/', validateCampground, catchAsync(async (req, res, next) => {
// // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
// const campground = new Campground(req.body.campground);
// await campground.save();
// res.redirect(`/campgrounds/${campground._id}`)
// }));

app.post('/', catchAsync(async (req, res, next) => {
// if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
const campground = new Campground(req.body.campground);
await campground.save();
res.redirect(`/campgrounds/${campground._id}`)
}));

app.get('/:id', catchAsync(async (req, res,) => {
const campground = await Campground.findById(req.params.id).populate('reviews');
res.render('campgrounds/show', { campground });
}));

app.get('/:id/edit', catchAsync(async (req, res) => {
const campground = await Campground.findById(req.params.id)
res.render('campgrounds/edit', { campground });
}))

app.put('/:id', validateCampground, catchAsync(async (req, res) => {
const { id } = req.params;
const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
res.redirect(`/campgrounds/${campground._id}`)
}));

app.delete('/:id', catchAsync(async (req, res) => {
const { id } = req.params;
await Campground.findByIdAndDelete(id);
res.redirect('/campgrounds');
}));
    


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