const express = require('express');
const app = express();

const port = 1000;

app.use(express.json()); // to convert data into json format
require('./states/states')(app);
require('./countries/countries')(app);
require('./countryAPI')(app);
app.listen(port, console.log(`Listeneing to the port ${port}.....`)); // listening to port
