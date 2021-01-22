const mongoose = require('../database');
const state = require('../models/states');

const statesSchema = new mongoose.Schema(state);

const StateModel = mongoose.model('States', statesSchema);
module.exports = StateModel;
