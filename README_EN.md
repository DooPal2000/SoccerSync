# ⚽ SoccerSync

<div align="center">

**Multi-League Football Information & Analysis Platform**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-white.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

[Watch Demo](https://youtu.be/AHs9yVf4z60) • [Contribute](#contributing) • [Report Issue](issues)

</div>

---

## 📋 Project Overview

**SoccerSync** is a comprehensive football platform providing match information, standings, and player analysis for various global leagues. It offers real-time data from major leagues including K-League, J-League, EPL, La Liga, and Serie A through API-Football-v1, along with features like match predictions, community forums, and favorites.

### Supported Leagues

| League | League ID | Description |
|--------|-----------|-------------|
| K-League 1 | 292 | Korean Professional Football 1st Division |
| K-League 2 | 293 | Korean Professional Football 2nd Division |
| J-League 1 | 98 | Japanese J1 League |
| J-League 2 | 99 | Japanese J2 League |
| EPL | 39 | English Premier League |
| La Liga | 140 | Spanish 1st Division |
| Serie A | 135 | Italian 1st Division |

### Key Features

- 🎯 **Fixture (Match Schedule)**: Match schedules, results, and timing information for various leagues
- 📊 **Standing**: Real-time league standings with wins, draws, losses, and goal difference
- 🔮 **Prediction**: Match prediction and management
- 👤 **Player Analysis**: Detailed player stats and career information via player ID
- 🏢 **Team Analysis**: Team squad and roster information
- ⚔️ **League Comparison**: Compare leagues (e.g., K-League vs J-League)
- 💬 **Community**: Posting and comment features to connect with fellow fans
- 🔐 **User Authentication**: Secure signup and login system
- ⭐ **Favorites**: Favorite match highlighting feature

---

## 🛠 Tech Stack

### Backend

| Technology | Version | Description |
|------------|---------|-------------|
| Node.js | 18+ | JavaScript runtime |
| Express.js | 4.18+ | Web application framework |
| MongoDB | 6.0+ | NoSQL database |
| Mongoose | 8.1+ | MongoDB ODM |
| Passport.js | 0.7+ | User authentication middleware |

### Frontend

| Technology | Version | Description |
|------------|---------|-------------|
| EJS | 3.1+ | Template engine |
| EJS-Mate | 4.0+ | Layout template |
| Bootstrap | 5.3+ | CSS framework |
| AOS | 2.3+ | Scroll animation library |
| Axios | HTTP client |
| SweetAlert2 | Alert UI library |
| FontAwesome | Icon library |

### Key Libraries

- **Axios**: HTTP client (API-Football-v1 integration)
- **Multer + Cloudinary**: Image upload and storage
- **Joi**: Data validation
- **Express Session**: Session management
- **Connect Flash**: Flash messages

### API

- **API-Football-v1**: Provides football match, player, and standings data (RapidAPI)

---

## 📁 Project Structure

```
SoccerSync/
├── controllers/       # Controller logic
├── models/           # Mongoose models (User, Fixture, Posting, Comment, TeamSquad, Player)
├── routes/           # Express routers
├── views/            # EJS templates
│   ├── layouts/      # Layout templates
│   └── partials/     # Partial templates (navbar, footer, flash)
├── public/           # Static files (CSS, JS, images)
├── utils/            # Utility functions (catchAsync, ExpressError)
├── cloudinary/       # Cloudinary configuration
├── seeds/            # Database seeds
├── middleware.js     # Middleware
├── schemas.js        # Mongoose schema validation
├── app.js            # Main application file
└── package.json      # Project dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB (Local or MongoDB Atlas)
- API-Football-v1 API Key (RapidAPI)
- Cloudinary account (for image upload, optional)

### Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/kkyub/SoccerSync.git
cd SoccerSync
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the project root and add the following:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/soccersync
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/soccersync

# API-Football-v1 (RapidAPI)
RAPIDAPI_KEY=your_rapidapi_key_here

# Session Secret
SESSION_SECRET=your_secret_key_here

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Verify database connection**

```bash
# Make sure MongoDB is running
# Local MongoDB: mongod
# MongoDB Atlas: Check cluster status on dashboard
```

### Running the Application

**Development Mode**

```bash
npm run dev
```

The application will run at `http://localhost:3000`. Nodemon automatically detects file changes and restarts the server.

**Production Mode**

```bash
npm start
```

---

## 📊 Menu & Feature Description

### Fixture (Match Schedule)
- **Supported Leagues**: K-League 1, K-League 2, J-League 1, J-League 2, EPL, La Liga, Serie A
- Monthly match schedule browsing (previous/next month navigation)
- Real-time match results and scores
- Quick link to match predictions
- Favorites feature (login required)
- Win/Loss team highlighting (green/red/gray background)

### Standing (League Standings)
- **Supported Leagues**: K-League 1, K-League 2, J-League 1, J-League 2, EPL, La Liga, Serie A
- Real-time league standings table
- Detailed info: wins, draws, losses, goals scored, goals conceded, goal difference, points

### Team Analysis
- Search by team ID to view team squad
- Player roster and position information
- Click on players to view detailed information

### Player Analysis
- Search by player ID for detailed stats
- Career, position, abilities, and other detailed information

### Prediction (Match Predictions)
- Match prediction functionality
- Compare predictions with other users

### League Comparison (K-League vs J-League)
- Compare data between leagues
- Visual comparison analysis

### Community (Postings)
- Create and view posts
- Comment functionality
- Image upload (Cloudinary integration)

### User Authentication
- Signup and login
- Passport.js based Local Strategy
- Session-based authentication

---

## 🎨 Demo

Check out the demo to see SoccerSync in action:

[![SoccerSync Demo](https://img.youtube.com/vi/AHs9yVf4z60/0.jpg)](https://youtu.be/AHs9yVf4z60)

---

## 📝 API Documentation

### Used APIs

- **API-Football-v1** (RapidAPI)
  - Match schedules and results (`/v3/fixtures`)
  - League standings (`/v3/standings`)
  - Player squads (`/v3/players/squads`)
  - Player information (`/v3/players`)

### Main Routes

| Route | Description |
|-------|-------------|
| `/fixtures/:leagueId` | Match schedule for specific league |
| `/standings/:leagueId` | Standings for specific league |
| `/analysis/teams` | Team search page |
| `/analysis/teams/:teamId` | Specific team squad |
| `/analysis/players` | Player search page |
| `/analysis/players/:playerId` | Specific player information |
| `/predictions/:fixtureId` | Prediction for specific match |
| `/postings` | Community forum |

### Data Models

**User**
```javascript
{
  email: String (unique, required),
  username: String,
  favorites: [Number]  // Favorite fixtureIds
}
```

**Fixture**
```javascript
{
  fixtureId: Number (unique, index),
  referee: String,
  venue: Object,
  status: Object,
  league: Object,
  teams: Object,
  goals: Object,
  score: Object
}
```

**TeamSquad**
```javascript
{
  team: {
    id: Number,
    name: String,
    logo: String
  },
  players: [ObjectId]  // Player references
}
```

**Player**
```javascript
{
  id: Number (unique),
  name: String,
  age: Number,
  number: Number,
  position: String,
  photo: String
}
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

Developed as a personal project.

---

## 🙏 Acknowledgments

- [API-Football-v1](https://rapidapi.com/api-sports/api/api-football/) - For providing football data API
- [Bootstrap](https://getbootstrap.com/) - UI framework
- [Cloudinary](https://cloudinary.com/) - Image storage

---

<div align="center">

**Thank you for using SoccerSync!** ⚽

</div>
