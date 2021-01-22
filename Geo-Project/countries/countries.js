const Country = require('../dbModels/countries_model');

module.exports = app => {

app.post('/api/countries', (req, res) => {
    const newCountry = {
        ctr_name: req.body.ctr_name,
        ctr_code: req.body.ctr_code,
        ctr_capital : req.body.ctr_capital,
        ctr_population: req.body.ctr_population,
        ctr_states: req.body.ctr_states
    }

    createCountry(newCountry).then(c => res.send(c));
});


app.get('/api/countries', (req, res) => {
    getCountriesList().then(ct => res.send(ct));
});

app.put('/api/countries', (req, res) => {
    const updatedCountry = {
        ctr_id: req.body.ctr_id,
        ctr_name: req.body.ctr_name,
        ctr_code: req.body.ctr_code,
        ctr_capital: req.body.ctr_capital,
        ctr_population: req.body.ctr_population,
        ctr_states: req.body.ctr_states
    }

    updateCountry(updatedCountry).then(ct => {
        res.send(ct);
    });

});

app.delete('/api/countries/:ctr_id', (req, res) => {
    removeCountry(req.params.ctr_id).then(() => {
        res.send("Country removed from database");
    })
});

}

//---------------------------------------------------------------

async function createCountry(ctr) {
    const country = new Country(ctr);
    const createdCountry = await country.save();
    return createdCountry;
}


async function getCountriesList() {
    let UI_countries = [];
    const countries = await Country.find();
    countries.forEach(country => {
        const countries_frontend = {
            ctr_id: country._id,
            ctr_name: country.ctr_name,
            ctr_code: country.ctr_code,
            ctr_capital: country.ctr_capital,
            ctr_population: country.ctr_population,
            ctr_states: country.ctr_states
        }

        UI_countries.push(countries_frontend);
    });
    return UI_countries;
}



async function updateCountry(country) {
    const countryById = await Country.findById({_id: country.ctr_id});

    countryById.ctr_name = country.ctr_name;
    countryById.ctr_code = country.ctr_code;
    countryById.ctr_capital = country.ctr_capital;
    countryById.ctr_population = country.ctr_population;
    countryById.ctr_states = country.ctr_states;

    const editedCountry = countryById.save();
    return editedCountry;
}



async function removeCountry(id) {
    const country = await Country.findByIdAndRemove(id, {useFindAndModify: false });

}

