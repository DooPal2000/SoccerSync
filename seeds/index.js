
const mongoose = require('mongoose');
const teams = require('./teams');
const { places, descriptors } = require('./seedHelpers');
const Posting = require('../models/posting');
require('dotenv').config({ path: '../.env' });

console.log("Loaded teams:", teams);  // teams 배열 확인

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

// mongoose.connect('mongodb://localhost:27017/yelp-camp',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true     
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

const sample = array =>
  array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
  await Posting.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const randomIndex = Math.floor(Math.random() * teams.length);
    if (!teams[randomIndex]) {
      console.error(`Invalid team at index ${randomIndex}`);
      continue;  // 팀 데이터가 없으면 건너뜀
    }

    const price = Math.floor(Math.random() * 20) + 10;
    const posting = new Posting({
      author: '65de081bf0e630e741fc9d2c',
      location: `${teams[randomIndex].team}, ${teams[randomIndex].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description: 'This is a post about the team and their performance in the latest season.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          teams[randomIndex].longitude,
          teams[randomIndex].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dwtgvozjf/image/upload/v1710860831/YelpCamp/zz9ynoe3px884li9zkkk.jpg',
          filename: 'SoccerSync/zz9ynoe3px884li9zkkk',
        }
      ]
    })
    await posting.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})