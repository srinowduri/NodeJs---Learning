const mysql = require('mysql');
const config = require('./config');

let connection = mysql.createConnection(config);

let createExpenses = `create table if not exists expenses(
    id int primary key auto_increment,
    date varchar(255)not null,
    store varchar(255)not null,
    price int,
    comments varchar(255)not null
)`;

connection.query(createExpenses, (err) => {
    if(err) {
        return console.log(err.message);
    }
})