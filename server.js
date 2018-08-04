const express = require('express');
const app = express();
const path= require('path');
const PORT = process.env.PORT || 3000;



app.use('/build', express.static('dist'))
app.use(express.static(__dirname + '/dist'));


/*** TRAIN ML ALGORITHM ON SERVER START */
const AI = require('./ai.js');
global.nb = new AI('ml-data.csv');
global.nb.initiate();

const API = require('./API');
app.use('/api', API);
// Static File Distribution
app.use('/public', express.static(__dirname +'/src/public/'))
app.use('/img', express.static(__dirname +'/src/public/img'))
app.use('/media', express.static(__dirname + '/src/public/media'));
app.listen(PORT, () => {
console.log('Server running on', PORT);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/public/index.html')); 
});
