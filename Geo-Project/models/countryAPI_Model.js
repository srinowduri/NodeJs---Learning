const { ctr_id } = require('./countries');
const state = require('./states');

let country_Api = function (ctApi_id, ctApi_name, ctApi_code, ctApi_capital, ctApi_population, ctApi_states) {
    this.ctApi_id = ctApi_id;
    this.ctApi_name = ctApi_name;
    this.ctApi_code = ctApi_code;
    this.ctApi_capital = ctApi_capital;
    this.ctApi_population =  ctApi_population;
    this.ctApi_states = ctApi_states;
}

module.exports = country_Api;










// const CountryAPI = {
//     ctApi_id: {
//         type: String
//     },
//     ctApi_name: {
//         type: String
//     },
//     ctApi_code: {
//         type: String
//     },
//     ctApi_capital: {
//         type: String
//     },
//     ctApi_population: {
//         type: Number
//     },
//     ctApi_states: [state]
// };

