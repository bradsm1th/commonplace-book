const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  comment: String,
  where: String,
  why: String,
  when: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const quoteSchema = new mongoose.Schema({
  content: String,
  author: String,
  // separate schema
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  // embedded schema
  // userAnnotations: [annotationSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Quote', quoteSchema);