// ENV
require('dotenv').config();

// MODULE REQUIRES
const express = require('express');
const flash = require('connect-flash');
const parser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const app = express();


// DATABASE
const db = require('./models');

// CONSTANTS
const PORT = process.env.PORT || 3000;

// SETTINGS
app.set('view engine', 'pug');

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(parser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// CUSTOM MIDDLEWARE
app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  next();
});


app.get('/', async (req, res) => {
  try {
    const animals = await db.animal.findAll({
      attributes: [
        'species_name',
        'scientific_name',
        'image_url',
        'description',
        'extinct',
      ],
    });

    if (animals.length > 0) {
      const animal = animals[Math.floor(Math.random() * animals.length)];
      return res.render('home', { animal });
    }
  } catch (error) {
    console.log(error);
  }
  const animal = {
    species_name: 'Some bird',
    image_url: 'https://onehdwallpaper.com/wp-content/uploads/2015/07/Beauty-Of-Animals-in-HD-Wallpapers.jpg',
  };
  return res.render('home', { animal });
});

// CONTROLLERS
app.use('/favorites', require('./controllers/favorites'));


// LISTEN
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
