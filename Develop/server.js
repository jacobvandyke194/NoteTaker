const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const app = express();
//boiler plate middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//allows me to use anything in public folder without mutiple routes
app.use(express.static('public'))

//takes user to landing HTML page 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});



app.listen(PORT, () => {
   console.log(`listening on http://localhost:${PORT}`);
});