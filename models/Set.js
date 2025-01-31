const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  price: Number,
  seller: String,
});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;