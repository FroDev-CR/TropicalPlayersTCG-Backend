const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  price: Number,
  seller: String,
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;