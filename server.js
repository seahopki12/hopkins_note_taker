const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
let PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const noteList = [];
const noteIdArray= [];

// Routes
// ===========================================================
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", function (err, data) {
        if (err) throw err;
        returnedData = JSON.parse(data);
        return res.send(returnedData);
    });
});

app.post("/api/notes", function (req, res) {
    noteList.push(req.body);
    noteIdArray.push(noteList.length);
    savedData = JSON.stringify(noteList);
    fs.writeFile("db/db.json", savedData, function (err) {
        if (err) throw err;
        res.end();
    });
});

app.delete("/api/notes/:id", function (req, res) {
    let chosen = req.params.id;
    for (let i = 0; i < noteIdArray - 1; i ++) {
        if (chosen === noteIdArray[i]) {
            noteList.pop(noteIdArray[i])
            res.end();
        } else {
            console.log ("ID does not exist!")
            res.end();
        }
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Listener
// ===========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});