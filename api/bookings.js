const mongoose = require('mongoose');
const Booking = require('../models/Booking');

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

module.exports = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { client, clientId, phone, captain, captainId } = req.body;
            if (!client || !clientId || !phone || !captain || !captainId) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const newBooking = new Booking(req.body);
            await newBooking.save();
            return res.status(201).json({ message: 'Booking added successfully', booking: newBooking });
        } 
        
        if (req.method === 'GET') {
            const { clientId } = req.query;

            if (!clientId) {
                return res.status(400).json({ message: 'clientId is required' });
            }

            const bookings = await Booking.find({ clientId });
            if (bookings.length === 0) {
                return res.status(404).json({ message: 'No bookings found for this client' });
            }

            return res.status(200).json(bookings);
        } 
        
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ message: 'An error occurred while processing the request', error });
    }
};
