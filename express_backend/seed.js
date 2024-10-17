const mongoose = require('mongoose');
const fs = require('fs');
const Device = require('./models/Device'); // Import the Device model

require('dotenv').config();

const mongoURI =`mongodb://${process.env.MONGO_DATABASE_USER}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_HOST}:${process.env.MONGO_DATABASE_PORT}/${process.env.MONGO_DATABASE_NAME}`


const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
        });

        console.log('MongoDB connected');

        // Read the seed data from the JSON file
        let data = JSON.parse(fs.readFileSync('./sample_data.json', 'utf-8'));
        data = data.map(item => {
            const { _id, ...rest } = item; // Destructure to remove _id
            return rest;
        });
        // Clear existing data (optional)
        await Device.deleteMany();

        // Insert seed data into the database
        await Device.insertMany(data);
        console.log('Data seeded successfully!');

    } catch (err) {
        console.error('Error seeding the database:', err);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
    }
};

// Run the seed function
seedDatabase();
