// def need the quote model
const QuoteModel = require('../models/quote');

module.exports = {
  create,
  index,
  new: newQuote,
}

// create has to be 'async…await' bc of the round-trip database actions
async function create(req, res, next) {
  console.log(req.body.content, "<-- quote content");
  console.log(req.body.author, "<-- quote author");
  console.log(req.user.googleId, "<-- poster ID");
  console.log(req.user._id, "<-- Mongo ID");
  // console.log(res.locals, "<-- res.locals");

  try {
    const thisQuoteDoc = await QuoteModel.create(req.body)

    // ❗❗❗❗
    res.redirect('/quotes');
    // ❗❗❗❗
  } catch (err) {
    console.log(err)
    res.send(err);
  }
}


// index for all (my) quotes
async function index(req, res, next) {
  console.log(req.user);
  try {
    res.render('quotes/index');
  } catch (err) {
    console.log(err)
    res.send(err);
  }
}


// start 'create new quote' process
function newQuote(req, res, next) {
  res.render('quotes/new', { title: "hotdog title" });
}
