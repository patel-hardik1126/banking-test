const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const deviceRoutes = require('./routes/deviceRoutes');
require('dotenv').config();

const app = express();
app.use(cors())
const PORT = process.env.EXPRESS_APPLICATION_PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
const mongoURI =`mongodb://${process.env.MONGO_DATABASE_USER}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_HOST}:${process.env.MONGO_DATABASE_PORT}/${process.env.MONGO_DATABASE_NAME}`

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});


// Routes
app.use('/api/voicemails/v1/details', deviceRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
