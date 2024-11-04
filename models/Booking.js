const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    client: { type: String, required: true },
    clientId: String,
    captain: String,
    captainId: String,
    carType: String,
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    returnIncluded: { type: String, enum: ['yes', 'no'], default: 'no' },
    cost: { type: Number, required: true },
    notes: String,
    departureDate: { type: Date, required: true },
    departureTime: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    numberOfBags: { type: Number, default: 0 },
    phone: { type: String, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
