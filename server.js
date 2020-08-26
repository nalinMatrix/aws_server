const PORT = 3000;


var path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    } else {
        console.log(err);
    }
});

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`dist/${req.url}`));
    } else {
        res.sendFile(path.resolve('dist/index.html'));
    }
});

app.listen(3000, () => console.log(`Server started at port : 3000`));