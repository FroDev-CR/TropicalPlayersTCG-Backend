const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (REEMPLAZA <dbname> POR TU NOMBRE DE BASE DE DATOS)
const mongoURI = 'mongodb+srv://FroDev:Froder8562.@cluster0.oycsn.mongodb.net/tcgdb?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Modelos
const Card = require('./models/Card');
const Set = require('./models/Set');

// Routes
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cards' });
  }
});

app.get('/api/sets', async (req, res) => {
  try {
    const sets = await Set.find().populate('cards');
    res.json(sets);
  } catch (error) {
    console.error('Error fetching sets:', error);
    res.status(500).json({ error: 'Error fetching sets' });
  }
});

app.post('/api/sets', async (req, res) => {
  try {
    const { name, cardIds } = req.body;
    const newSet = new Set({ name, cards: cardIds });
    await newSet.save();
    res.json(newSet);
  } catch (error) {
    console.error('Error creating set:', error);
    res.status(500).json({ error: 'Error creating set' });
  }
});

app.get('/api/pokemon-cards', async (req, res) => {
  const { query } = req.query;
  
  try {
    const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
      headers: {
        'X-Api-Key': 'tu_api_key_aqui', // 🚨 REEMPLAZA CON TU API KEY REAL
      },
      params: {
        q: query ? `name:${query}*` : '',
        pageSize: 50,
      },
    });
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching Pokémon cards:', error);
    res.status(500).json({ error: 'Error fetching cards' });
  }
});

app.post('/api/cards', async (req, res) => {
  try {
    const newCard = new Card(req.body);
    await newCard.save();
    res.json(newCard);
  } catch (error) {
    console.error('Error adding card:', error);
    res.status(500).json({ error: 'Error adding card' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

