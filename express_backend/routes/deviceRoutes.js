const express = require('express');
const Device = require('../models/Device');
const router = express.Router();
require('dotenv').config();


// Fetch devices with pagination and filtering
router.get('/', async (req, res) => {
    const { page = 1, page_size = 10, userId } = req.query;

    const query = {};
    if (userId) {
        query.userId = userId; // Filter by userId if provided
    }

    try {
        const count = await Device.countDocuments(query);
        const devices = await Device.find(query)
            .limit(page_size * 1)
            .skip((page - 1) * page_size)
            .exec();
        res.json({
            count,
            next: (count > page * page_size) ? `http://localhost:${process.env.EXPRESS_APPLICATION_PORT}/api/voicemails/v1/details?page=${parseInt(page) + 1}&page_size=${page_size}` : null,
            previous: (page > 1) ? `http://localhost:${process.env.EXPRESS_APPLICATION_PORT}/api/voicemails/v1/details?page=${page - 1}&page_size=${page_size}` : null,
            results: devices,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
