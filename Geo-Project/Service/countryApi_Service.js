const Country = require('../dbModels/countries_model');
const State = require('../dbModels/state_model');
const CountryApi = require('../models/countryAPI_Model');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

async function getCountryApi_from_Country(country) {
    // const Ctr_Api = new CountryApi;
    let states = [];


   
   
     await asyncForEach(country.ctr_states,  async (stID) => {
        const state =  await State.findById(stID);
        const states_frontend = {
            st_id: state._id,
            st_name: state.st_name,
            st_code: state.st_code,
            st_capital: state.st_capital
        }

        states.push(states_frontend);
        console.log('state by ID $%%%%%%%%%%%%' + JSON.stringify(states_frontend));

    });

    console.log('States $$$$$$$$$ : ' + JSON.stringify(states));

    const countries_frontend = {
        ctr_id: country.ctr_id,
        ctr_name: country.ctr_name,
        ctr_code: country.ctr_code,
        ctr_capital: country.ctr_capital,
        ctr_population: country.ctr_population,
        ctr_states: states
    }

    


    // const Ctr_Api = new CountryApi(country.ctr_id, country.ctr_name, 
    //                         country.ctr_code, country.ctr_capital, country.ctr_population, states);

    // Ctr_Api.ctApi_id = country.ctr_id;
    // Ctr_Api.ctApi_name = country.ctr_name;
    // Ctr_Api.ctApi_code = country.ctr_code;
    // Ctr_Api.ctApi_capital = country.ctr_capital;
    // Ctr_Api.ctApi_population = country.ctr_population;

    console.log('$$$$$$$$$$$ country api data ' + JSON.stringify(countries_frontend));

    return countries_frontend;
}

 async function fetchData (countryId) {
    const country = await Country.findById(countryId);
    const ct_Api = await getCountryApi_from_Country(country);

    console.log('countryApi Service data ################' +JSON.stringify(ct_Api));
    return ct_Api;
}

module.exports = fetchData;