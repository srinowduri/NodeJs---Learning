
module.exports = app => {
    const fetchData = require('./Service/countryApi_Service');

    app.get('/api/countryApi/:id', async (req, res)  => {
        const ct_Api = await fetchData(req.params.id);
        
        // console.log('countryApi data ################' +JSON.stringify(ct_Api));
        res.send(ct_Api);
    });
}


