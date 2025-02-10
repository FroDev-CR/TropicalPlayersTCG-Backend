const mongoose = require('mongoose');
const Set = require('./models/Set');
const Card = require('./models/Card');

const mongoURI = 'mongodb+srv://FroDev:Froder8562.@cluster0.oycsn.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
  populateDB();
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Definir los sets que quieres añadir
const sets = [
  { name: 'S&V 151' },
  { name: 'S&V Paradox-Rift' },
  { name: 'S&V Shoulden Fable' },
  // Puedes añadir más sets aquí
];

async function populateDB() {
  try {
    // Eliminar todos los sets y cartas existentes (opcional, solo si quieres empezar desde cero)
    await Set.deleteMany({});
    await Card.deleteMany({});

    // Insertar los nuevos sets
    const insertedSets = await Set.insertMany(sets);
    console.log('Sets inserted:', insertedSets);

    // Cerrar la conexión a MongoDB
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating database:', error);
  }
}