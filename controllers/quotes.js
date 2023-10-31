// def need the quote model
const QuoteModel = require('../models/quote');

module.exports = {
  create,
  index,
  new: newQuote,
  show
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
  try {
    // get all quotes from Mongo
    const allQuoteDocs = await QuoteModel.find({}); 
    // ❗❗❗❗
    console.log(allQuoteDocs, "<-- all quote docs");
    // ❗❗❗❗


    res.render('quotes/index', {
      quotes: allQuoteDocs
    });
  } catch (err) {
    console.log(err)
    res.send(err);
  }
}


// start 'create new quote' process
function newQuote(req, res, next) {
  res.render('quotes/new', { title: "hotdog title" });
}


// show page for one quote
async function show(req, res, next) {
  try {
    // get this Quote from Mongo
    const thisQuoteDoc = await QuoteModel.find({_id: req.params.id})

    // console.log(req.body, "<-- req.body");
    console.log(thisQuoteDoc, "<-- should be thisQuoteDoc");

    res.render('quotes/show', 
    {
      thisQuoteDoc,
    })

  } catch (err) {
    console.log(err);
    res.send(err);
  }
}