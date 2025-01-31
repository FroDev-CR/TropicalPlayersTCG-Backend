const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://FroDev:Froder8562.@cluster0.oycsn.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const Card = require('./models/Card');

// Routes
app.get('/api/cards', async (req, res) => {
  const cards = await Card.find();
  console.log('Cards fetched:', cards); // Log para verificar los datos
  res.json(cards);
});

app.post('/api/cards', async (req, res) => {
  const newCard = new Card(req.body);
  await newCard.save();
  res.json(newCard);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});