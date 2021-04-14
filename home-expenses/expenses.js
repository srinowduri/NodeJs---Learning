const mysql = require('mysql');
const config = require('./config');

let connection = mysql.createConnection(config);

module.exports = app => {

    app.get('/api/expenses', (req, res) =>{
        res.writeHead(200, {'Content-Type' : 'text/json'});
        connection.query('Select * from expenses', (error, result) =>{
            if(error) throw error;

            res.write(JSON.stringify(result));
            res.end();
        });
    });

    app.get('/api/expenses/:id', (req, res) =>{
        res.writeHead(200, {'Content-Type' : 'text/json'});
        let id = req.params.id;
        
        const sql = 'Select * from expenses Where id = ?';
        connection.query(sql, [id], (error, result) => {
            if(error) throw error;

            console.log('******************______ : ' + JSON.stringify(result[0]));
            res.write(JSON.stringify(result[0]));
            res.end();
        });
    });

    app.post('/api/expenses', (req, res) => {

        date = req.body.date;
        store = req.body.store;
        price = req.body.price;
        comments = req.body.comments;

        const message = {
            text: ""
        }

        let sql = 'INSERT INTO expenses(date, store, price, comments) VALUES(?, ?, ?, ?)';
        res.writeHead(200, {'Content-Type' : 'text/json'});

        connection.query(sql, [date, store, price, comments], (error, result) => {
            if(error) throw error;

            message.text = "Successfully Added";
            res.write(JSON.stringify(message));
           // res.write(JSON.stringify(result));
            res.end();
        });
    });


    app.put('/api/expenses', (req, res) => {

        id =  req.body.id,
        date = req.body.date;
        store = req.body.store;
        price = req.body.price;
        comments = req.body.comments;

        const message = {
            text: ""
        }

        let sql = 'UPDATE expenses SET date = ?, store = ?, price = ?, comments = ? WHERE id = ?';
        res.writeHead(200, {'Content-Type' : 'text/json'});

        connection.query(sql, [date, store, price, comments, id], (error, result) => {
            if(error) throw error;

            message.text = "Successfully Updated";
            res.write(JSON.stringify(message));
           // res.write(JSON.stringify(result));
            res.end();
        });
    });

    app.delete('/api/expenses/:id', (req, res) => {
        let id = req.params.id;
        
        // console.log("inside delete request: " + id);
        let sql = 'DELETE FROM expenses WHERE id = ?';

        
        const message = {
            text: ""
        }

        connection.query(sql, [id], (err, result) => {
            if(err) throw err;

            message.text = "Successfully Deleted";
            res.write(JSON.stringify(message));
           // res.write(JSON.stringify(result));
            res.end();
        })
    })
}