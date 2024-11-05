const mongoose = require('mongoose');
const Booking = require('../models/Booking');

const mongoURI = process.env.MONGO_URI;

if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("MongoDB connected"))
      .catch((error) => console.error("MongoDB connection error:", error));
}

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const newBooking = new Booking(req.body);
            await newBooking.save();
            res.status(201).json({ message: 'Booking added successfully', booking: newBooking });
        } catch (error) {
            console.error("Error adding booking:", error);
            res.status(500).json({ message: 'Failed to add booking', error });
        }
    } else if (req.method === 'GET') {
        try {
            const clientId = req.query.clientId;
            if (!clientId) {
                return res.status(400).json({ message: 'clientId is required' });
            }

            const bookings = await Booking.find({ clientId });

            if (bookings.length === 0) {
                return res.status(404).json({ message: 'No bookings found for this client' });
            }

            res.status(200).json(bookings);
        } catch (error) {
            console.error("Error retrieving bookings:", error);
            res.status(500).json({ message: 'Failed to retrieve bookings', error });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
