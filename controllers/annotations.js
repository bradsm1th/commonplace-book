// quote model
const QuoteModel = require('../models/quote');

module.exports = {
  create,
}

/* =======================
/* functions
/* =====================*/

async function create(req, res, next) {

  console.log(req.body, "<-- req.body (the metadata)");
  console.log(req.params.id, "<-- req.params.id (the quote)");

  try {
    // grab correct doc from DB
    const thisQuoteDoc = await QuoteModel.findById(req.params.id)
    // update it
    thisQuoteDoc.userAnnotations.push(req.body);
    // save it
    await thisQuoteDoc.save();
    res.redirect(`/quotes/${req.params.id}`)
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}