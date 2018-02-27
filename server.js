
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     //res.send('<h1>Hello Express</h2>');
//     res.send({
//         name: 'Shawon',
//         likes: [
//             'Biking',
//             'Cities'
//         ]
//     });
// });

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = (`${now}: ${req.method} ${req.url}`);
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to My Website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'This is About Page'
    });
});

app.get('/bad', (req, res) => {
    //res.send('<h1>Hello Express</h2>');
    res.send({
        name: 'Unable to handle request'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});























//
