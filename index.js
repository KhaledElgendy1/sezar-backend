const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookingsRoutes = require('./api/bookings'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}


app.use('/api/bookings', bookingsRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
