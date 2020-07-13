const { connectToMongoDB } = require('./utils');

async function resetDb(db) {
  try {
    console.log('dropping user table...');
    await db.collection('user').drop();
    console.log('done');
  } catch (e) {
    console.log('user collection does not exist');
  }

  try {
    console.log('dropping token table...');
    await db.collection('token').drop();
    console.log('done');
  } catch (e) {
    console.log('token collection does not exist');
  }
}

async function main() {
  try {
    const { client, db } = await connectToMongoDB();

    await resetDb(db);

    await client.close();
  } catch (e) {
    console.error('Something went wrong...', e.message);
  }
}

main();
