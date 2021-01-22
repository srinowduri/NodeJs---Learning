const state = require('../models/states');
const Country = {
    ctr_id: {
        type: String
    },
    ctr_name: {
        type: String
    },
    ctr_code: {
        type: String
    },
    ctr_capital: {
        type: String
    },
    ctr_population: {
        type: Number
    },
    ctr_states: {
        type: state
    }
} 

module.exports = Country;