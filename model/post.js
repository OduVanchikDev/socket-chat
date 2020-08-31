const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  text: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
  },
  visible: Boolean,
})

module.exports = mongoose.model('Post', postSchema)
