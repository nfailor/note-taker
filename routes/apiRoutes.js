const router = require('express').Router();
const express = require('express');
const fs = require('fs');

const fileName = './db/db.json'

router.use(express.json());

router.get('/notes', (req, res) => {
    const data = fs.readFileSync(fileName, 'utf-8')
    const parsedData = JSON.parse(data)
    console.log(data)
    res.status(200).json(parsedData);
});

router.post('/notes', (req, res) => {
    // extract the new note from the request body
    const newNote = req.body;

    // read existing data from db.json
    const data = fs.readFileSync(fileName, 'utf-8');
    const parsedData = JSON.parse(data);

    // Assign a unique ID to the new note (you may use a library like uuid)
    newNote.id = (Date.now() + parsedData.length).toString();

    // add the new note to the existing data
    parsedData.push(newNote);

    // write the updated data back to db.json
    fs.writeFileSync(fileName, JSON.stringify(parsedData, null, 2), 'utf-8')

    // respond with the updated data or a success message
    res.json(parsedData)
});

router.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const data = fs.readFileSync(fileName, 'utf-8');
    const parsedData = JSON.parse(data);

    const selectedNote = parsedData.find(note => note.id === noteId);

    if (selectedNote) {
        res.status(200).json(selectedNote);
    } else {
        res.status(400).json({ error: 'Note not found' });
    }
});

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const data = fs.readFileSync(fileName, 'utf-8');
    let parsedData = JSON.parse(data);

    // filtering out note with given ID
    parsedData = parsedData.filter((note) => note.id !== noteId);

    // write updated data back to db.json
    fs.writeFileSync(fileName, JSON.stringify(parsedData, null, 2), 'utf-8');

    // respond with updated data or a success message
    res.json(parsedData);
})

module.exports = router;