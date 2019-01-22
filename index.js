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


app.get('/', (req, res) => {
  res.render('home');
});

// CONTROLLERS
app.use('/favorites', require('./controllers/favorites'));


// LISTEN
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});