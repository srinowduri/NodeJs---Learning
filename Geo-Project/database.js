const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/GeoProject', {useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB.....'))
    .catch(err => console.error('Could not connected to MogoDB',err));

module.exports = mongoose;