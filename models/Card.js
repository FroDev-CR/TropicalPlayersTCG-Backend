const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  price: Number,
  seller: String,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
