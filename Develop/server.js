const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const app = express();
const uuid = require('./public/helpers/uuid.js');

const noteData = require('./public/db/notes.json');
//boiler plate middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//allows me to use anything in public folder without mutiple routes
app.use(express.static('public'));

//takes user to landing HTML page 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => res.json(noteData));


app.post('/api/notes', (req, res) => {


    const { title, text } = req.body;

    if (title && text) {

        console.log(`${req.method} request received to add a note`);

        const newNote = {
            title,
            text,
            id: uuid()
        }

        const response = {
            status: 200,
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);

        fs.readFile('./public/db/notes.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const parsedNotes = JSON.parse(data)

                parsedNotes.push(newNote);

                fs.writeFile('./public/db/notes.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (err) => {
                        console.log(err);
                    })
            }
        }
        )
    }
    else {
        res.status(500).json('Error in Notes')
    }
})

app.delete('/api/notes/:id', (req, res) => {
    
    fs.readFile('./public/db/notes.json', 'utf8', (err, data) => {
        const requestedNoteId = req.params.id

        if (requestedNoteId == data.noteId){
            res.send(noteData.splice(requestedNoteId))
        } else if(!data.id){
            console.log('note does not exist')
            console.log(err);
        }
    })
})

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});