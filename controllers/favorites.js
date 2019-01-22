const express = require('express');
const db = require('../models');
require('dotenv').load();

const Op = require('sequelize').Op;

const router = express.Router();

// GET /favorites -- List of all favorite animals
router.get('/', async (req, res) => {
  try {
    const favorites = await db.animal.findAll({
      attributes: [
        'species_name',
        'scientific_name',
        'image_url',
        'description',
        'extinct',
      ],
    });

    if (favorites) {
      return res.render('favorites/index', { favorites })
    }

  } catch (error) {
    console.log(error);
  }

  req.flash('error', 'No favorites yet. Add one now!');
  return res.redirect('/favorites/new');
});

// POST /favorites -- Add a new favorite animal
router.post('/', newFaveValidate, newFaveForm);

// GET /favorites/new -- Show a form to add a new animal
router.get('/new', newFaveForm);



// Callback used in to display sign up form
function newFaveForm (req, res) {
  res.render('favorites/new', { prevData: req.body, alerts: req.flash() });
}

// Form validation!
async function newFaveValidate (req, res, next) {
  req.body.extinct = !!req.body.extinct;

  try {
    const [fave, wasCreated] = await db.animal.findOrCreate({
      where: {
        scientific_name: req.body.scientific_name
      },
      defaults: req.body,
    });

    if(wasCreated) {
      req.flash('success', `Yay! ${fave.species_name} added!`);
      return res.redirect('/favorites');
    } else {
      req.flash('error', `${fave.scientific_name} is already faved!`);
      return res.redirect('/favorites/new');
    }

  } catch (error) {
    if (error.errors) {
      err.errors.forEach(e => {
        if (e.type === 'Validation error') {
          req.flash('error', e.message);
        } else {
          console.log('Not validation error: ', e);
        }
      })
      return next();
    }
    console.log('Error: ', err);
    req.flash('error', 'A server error occured. Please try again.');
    return res.render('error');
  }
}






module.exports = router;
