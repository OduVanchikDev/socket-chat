const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    // unique: true,
    // required: true,
  },
  pass: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // unique: true,
    // required: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
})

module.exports = model('User', userSchema)
