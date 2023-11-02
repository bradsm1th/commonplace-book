const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  comment: String,
  where: String,
  why: String,
  // when: String, (just use createdAt timestamp)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const quoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  // separate schema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // embedded schema
  userAnnotations: [annotationSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Quote', quoteSchema);