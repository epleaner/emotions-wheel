const { connectToMongoDB } = require('./utils');

const bcrypt = require('bcryptjs');
const faker = require('faker');

const colors = [
  '#F5C480',
  '#5FD34D',
  '#F0E650',
  '#7062A9',
  '#FF625E',
  '#427DA3',
];

async function makeEmotions(count = 100) {
  let emotions = [];

  for (let i = 0; i < count; i++) {
    const newEmotion = {
      _id: new MongoClient.ObjectId(),
      date: faker.date.between(new Date('1/1/2020'), new Date()).toJSON(),
      color: colors[Math.floor(Math.random() * colors.length)],
      data: ['emotion 1', 'emotion 2', 'emotion 3'],
      note: faker.lorem.paragraph(Math.floor(Math.random() * 10)),
    };

    emotions.push(newEmotion);
  }

  return emotions;
}

async function makeUserDetails(
  email = 'pleanbean@gmail.com',
  password = '12345678',
  name = 'eli',
  emailVerified = true
) {
  return {
    email,
    password: await bcrypt.hash(password, 10),
    name,
    emailVerified,
    emotions: await makeEmotions(),
  };
}

async function seedDb(db) {
  console.log('seeding...');

  try {
    console.log('adding new user...');
    await db.collection('user').insertOne(await makeUserDetails());
    console.log('done');
  } catch (e) {
    console.log('unable to add new user');
  }

  console.log('done seeding');
}

async function main() {
  try {
    const { client, db } = await connectToMongoDB();

    await seedDb(db);

    await client.close();
  } catch (e) {
    console.error('Something went wrong...', e.message);
  }
}

main();
