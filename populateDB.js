const axios = require('axios');
const mongoose = require('mongoose');
const Card = require('./models/Card'); // Asegúrate de que la ruta sea correcta

const mongoURI = 'mongodb+srv://FroDev:Froder8562.@cluster0.oycsn.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
  populateDB();
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const populateDB = async () => {
  try {
    const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
      headers: {
        'X-Api-Key': '68faef15-2551-4e17-8078-48b765099401' // Tu clave de API
      }
    });

    const cards = response.data.data.map(card => ({
      name: card.name,
      imageUrl: card.images.small,
      price: Math.floor(Math.random() * 100), // Precio ficticio
      seller: 'Fictitious Seller' // Vendedor ficticio
    }));

    await Card.insertMany(cards);
    console.log('Database populated with Pokémon cards');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating database:', error);
  }
};;