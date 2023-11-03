// def need the quote model
const QuoteModel = require('../models/quote');

module.exports = {
  create,
  delete: deleteQuote,
  edit,
  getAll,
  index,
  new: newQuote,
  show,
  update
}


// create has to be 'async…await' bc of the round-trip database actions
async function create(req, res, next) {
  try {
    // create quote doc
    const thisQuoteDoc = await QuoteModel.create({
      content: req.body.content,
      author: req.body.author,
      user: req.user._id,
    })
    await thisQuoteDoc.save();
    res.redirect('/quotes');
  } catch (err) {
    console.log(err)
    res.send(err);
  }
}


// delete
async function deleteQuote(req, res, next) {
  try {
    // grab this document
    const thisQuoteDoc = await QuoteModel.findById(req.params.id);

    // delete 
    await thisQuoteDoc.deleteOne();

    // redirect
    res.redirect('/quotes')

  } catch (err) {
    console.log(err);
    res.send(err);
  }
}


// 'edit' form
async function edit(req, res, next) {
  try {
    // get current doc from Mongo bc the 'edit' view will need it
    const thisQuoteDoc = await QuoteModel.findById(req.params.id);
    // pass it off
    res.render('quotes/edit', {
      thisQuoteID: req.params.id,
      thisQuoteDoc
    })
  } catch (err) {
    console.log(err)
    res.send(err);
  }
}


// get *everyone's* quotes, not just yours (sorted by created date)
async function getAll(req, res, next) {
  try {
    // get ALL docs with "content" if authenticated
    const allQuoteDocs = await QuoteModel.find({}).sort({createdAt: -1}).populate('user').exec();
    res.render('quotes/all', { allQuoteDocs });
  } catch (err) {
    console.log(err)
    res.send(err);
  }
}


// index for all (my) quotes
async function index(req, res, next) {
  try {
    // get all quotes from Mongo THAT THIS USER ADDED
    const allYourQuoteDocs = await QuoteModel
      .find({user: req.user._id})
      .sort({createdAt: -1});
    res.render('quotes/index', { quotes: allYourQuoteDocs });
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
    const thisQuoteDoc = await QuoteModel.findOne({ _id: req.params.id })
    res.render('quotes/show',
      {
        thisQuoteDoc,
        user: req.user
      })
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}


// update existing quote
async function update(req, res, next) {
  try {
    // get current doc from Mongo bc the 'edit' view will need it
    const thisQuoteDoc = await QuoteModel.findById(req.params.id);

    // update 
    thisQuoteDoc.content = req.body.content;
    thisQuoteDoc.author = req.body.author;

    // save
    await thisQuoteDoc.save();

    // redirect to that quote's show page
    res.redirect(`/quotes/${req.params.id}`)

  } catch (err) {
    console.log(err);
    res.send(err);
  }
}