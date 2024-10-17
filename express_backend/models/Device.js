const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    originationTime: { type: Number, required: true },
    clusterId: { type: String, required: true },
    userId: { type: Number, required: true },
    devices: {
        phone: { type: String },
        voicemail: { type: String },
    },
}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;
