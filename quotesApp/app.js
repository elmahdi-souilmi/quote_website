    const express = require('express')
    const app = express()
    const fs = require('fs')
    const mysql = require('mysql')
    const port = 2000

    // CREATE connection
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'souilmi',
        password: 'ELMAHDI',
        database: 'quote_db'
    });
    // CONNECT
    db.connect((err) => {
        if (err) {
            throw err
        }
        console.log('MYSQL connected.....')
    });

    // make you read the body req
    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    //to read file from the pubic folder
    app.use(express.static("public"));
    //to not use .ejs everytime
    app.set("view engine", "ejs");

    //READ all
    app.get('/home', (req, res) => {
        var quotes
        let sql = ' SELECT * FROM quote';
        let query = db.query(sql, (err, result, fields) => {
            if (err) throw err;
            quotes = result;
            res.render("home", {
                quotes: quotes
            })
            res.end()
        });
    });
    //   read from search
    app.get('/Search/:char', (req, res) => {
        var quotes;
        console.log(req.params.char)
        char = req.params.char
        let sql = `SELECT * FROM  quote  WHERE author like  "${req.params.char}%"`; 
        let query = db.query(sql, (err, result, fields) => {
            if (err) throw err;
            quotes = result;
            res.render("Search", {
                quotes: quotes,
            })
            res.end()
        });


    });
    // create
    app.post('/addquote', (req, res) => {
        var newQuotes = req.body;
        let sql = ' INSERT INTO quote  set ?';
        let query = db.query(sql, newQuotes, (err, result) => {
            if (err) throw err;
            res.redirect('/home')  

        })
    });
    // delete
    app.get('/deletequote/:id', (req, res) => {
        console.log(req.params.id)
        let sql = `DELETE FROM quote  WHERE quote_id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            res.redirect('/home')
        })
    })
    // update 
    app.post('/updatequote/:id', (req, res) => {
        var newQuotes = req.body;
        var id = req.params.id;
        let sql = `UPDATE quote SET quote = "${newQuotes.quote}", author = '${newQuotes.author}' WHERE quote_id = ${id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            res.redirect('/home') 
        })
    })
    app.get('/addquote', (req, res) => { 
        res.render("addQuotes"); 
    });

    app.listen(port, () => console.log(`Example app listening on port 2000!`))