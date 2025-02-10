const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  rarity: { type: String, required: true },
  code: { type: String, required: true },
  imageUrl: { type: String, required: true },
  setId: { type: mongoose.Schema.Types.ObjectId, ref: 'Set' }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;


