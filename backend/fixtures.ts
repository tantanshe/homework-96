import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('cocktails');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user, admin] = await User.create(
    {
      email: 'user@gmail.com',
      password: '1@345qWert',
      token: crypto.randomUUID(),
      displayName: 'User',
      role: 'user',
      avatar: 'fixtures/user.jpeg',
    },
    {
      email: 'admin@gmail.com',
      password: '1@345qWert',
      token: crypto.randomUUID(),
      displayName: 'Admin',
      role: 'admin',
      avatar: 'fixtures/admin.jpeg',
    }
  );

  await Cocktail.create(
    {
      user: user._id,
      name: 'Mojito',
      image: 'fixtures/mojito.jpg',
      recipe: 'Mix rum, mint, sugar, lime, and soda water.',
      isPublished: true,
      ingredients: [
        {name: 'Rum', amount: '50ml'},
        {name: 'Mint leaves', amount: '10 leaves'},
        {name: 'Sugar', amount: '2 tsp'},
        {name: 'Lime', amount: '1'},
        {name: 'Soda water', amount: '100ml'},
      ],
    },
    {
      user: user._id,
      name: 'Piña Colada',
      image: 'fixtures/pina_colada.jpeg',
      recipe: 'Blend rum, coconut cream, and pineapple juice.',
      isPublished: false,
      ingredients: [
        {name: 'Rum', amount: '50ml'},
        {name: 'Coconut cream', amount: '50ml'},
        {name: 'Pineapple juice', amount: '100ml'},
        {name: 'Pineapple slice', amount: '1 slice'},
      ],
    },
    {
      user: admin._id,
      name: 'Martini',
      image: 'fixtures/martini.jpeg',
      recipe: 'Stir gin and vermouth, garnished with olive.',
      isPublished: true,
      ingredients: [
        {name: 'Gin', amount: '60ml'},
        {name: 'Vermouth', amount: '10ml'},
        {name: 'Olive', amount: '1'},
      ],
    }
  );

  await db.close();
};

run().catch(console.error);
