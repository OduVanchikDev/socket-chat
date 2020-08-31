const { connect } = require('mongoose');

module.exports = connect('mongodb://localhost:27017/test_ex', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
