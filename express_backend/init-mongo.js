const mongoose = require('mongoose');
require('dotenv').config();

// Environment variables
const dbHost = process.env.MONGO_DATABASE_HOST || 'mongodatabase';
const dbPort = process.env.MONGO_DATABASE_PORT || '27017';
const dbName = process.env.MONGO_DATABASE_NAME || 'voicemailDB';
const rootUser = process.env.MONGO_DATABASE_USER || 'admin';
const rootPassword = process.env.MONGO_DATABASE_PASSWORD || 'admin_password';
const appUser = process.env.MONGO_DATABASE_USER || 'appUser';
const appPassword = process.env.MONGO_DATABASE_PASSWORD || 'password123';
async function initialize() {
  try {
    // Connect to MongoDB using root credentials
    const rootUri =`mongodb://${process.env.MONGO_DATABASE_USER}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_HOST}:${process.env.MONGO_DATABASE_PORT}/${process.env.MONGO_DATABASE_NAME}?authSource=admin`


    await mongoose.connect(rootUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected successfully to MongoDB as root');

    const db = mongoose.connection.db;

    // Check if the user already exists before creating
    const users = await db.command({ usersInfo: appUser });
    if (users.users && users.users.length > 0) {
      console.log(`User ${appUser} already exists, skipping creation.`);
    } else {
      // Create user with readWrite role
      await db.command({
        createUser: appUser,
        pwd: appPassword,
        roles: [{ role: 'readWrite', db: dbName }],
      });
      console.log(`User ${appUser} created successfully with access to database ${dbName}`);
    }

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Run the initialization
initialize();
