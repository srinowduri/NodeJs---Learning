const mongoose = require('../database');
const country = require('../models/countries');

const countriesSchema = new mongoose.Schema(country);

const CountryModel = mongoose.model('Countries', countriesSchema);
module.exports = CountryModel;
