const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// grabs data from public folder: index.html/notes.html
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})

const { data } = require('./db/db');

console.table(data);

// to valide the data being saved to the note
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// creating new object to notes array
function createNewNote(body, dataArray) {
    const note = body;
    dataArray.push(note);
    //writing the data to db.json
    fs.writeFileSync(
        //creating new file db.json with new data
        path.join(__dirname, './db/db.json'),
        //adding spaces to array
        JSON.stringify({ data: dataArray }, null, 2)
    );
    return note;
}

function findById(id, dataArray) {
    const results = dataArray.filter(data => data.id === id)
    return results;
}

function deleteNote(id, dataArray) {
    const results = data;
    console.log('printing id of deleteNote: ' + id);
    dataArray.splice(id, 1);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ data: dataArray }, null, 2)
    )
    return results;
}

app.delete('/api/db/:id', (req, res) => {
    const results = deleteNote(req.params.id, data);
    if(results) {
        res.json(results);
    } else {
        res.send(404);
    }
})

app.get('/api/db', (req, res) => {
    let results = data;
    if (req.query) {
        console.log(results);
    }
    res.json(results);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/api/db', (req, res) => {
    req.body.id = data.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.') 
    } else {
        const note = createNewNote(req.body, data);
        res.json(note);
    }

})



