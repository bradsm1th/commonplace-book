const router = require('express').Router();
const ensureLoggedIn = require('../config/auth')

// Controller(s)
const quotesController = require('../controllers/quotes');

/* =======================
/* All quote routes start with "/quotes")
/* =====================*/

// GET /quotes [for just logged-in user]
router.get('/', ensureLoggedIn, quotesController.index)
// GET /quotes/all (all quotes regardless of user?)
router.get('/all', ensureLoggedIn, quotesController.getAll)
// GET /quotes/new
router.get('/new', ensureLoggedIn, quotesController.new)
// GET /quotes/:id
router.get('/:id', ensureLoggedIn, quotesController.show)
// GET /quotes/:id/edit
router.get('/:id/edit', ensureLoggedIn, quotesController.edit);
// POST /quotes
router.post('/', ensureLoggedIn, quotesController.create)
// PUT /quotes/:id
router.put('/:id', ensureLoggedIn, quotesController.update);
// DELETE /quotes/:id
router.delete('/:id', ensureLoggedIn, quotesController.delete);


module.exports = router;