const router = require('express').Router();
const passport = require('passport');
const ensureLoggedIn = require('../config/auth')

module.exports = router;

// the controller
const annotationsController = require('../controllers/annotations');

/* =======================
/* All routes (start with "/" not "/annotations")
/* =====================*/

// POST quotes/:id/annotations
router.post('/quotes/:id/annotations', annotationsController.create);