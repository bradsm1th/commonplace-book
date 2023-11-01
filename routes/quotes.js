const router = require('express').Router();
const passport = require('passport');
const ensureLoggedIn = require('../config/auth')

// Controller(s)
const quotesController = require('../controllers/quotes');
const quote = require('../models/quote');
const quotes = require('../controllers/quotes');

/* =======================
/* All quote routes start with "/quotes")
/* =====================*/

// GET /quotes [for just logged-in user]
router.get('/', ensureLoggedIn, quotesController.index)
// GET /quotes/new
router.get('/new', ensureLoggedIn, quotesController.new)
// GET /quotes/:id
router.get('/:id', ensureLoggedIn, quotesController.show)
// POST /quotes
router.post('/', ensureLoggedIn, quotesController.create)
// DELETE /quotes/:id
router.delete('/:id', ensureLoggedIn, quotesController.delete);


module.exports = router;