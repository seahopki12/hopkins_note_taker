const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('assets'));

const noteList = [];

// Routes
// ===========================================================
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile("../db/db.json", function (err, data) {
        if (err) throw err;
        return res.end(data);
    });
});

app.post("/api/notes", function (req, res) {
    
    savedData = JSON.stringify(req.body);
    noteList.push(savedData);
    fs.writeFile("../db/db.json", noteList, function (err) {
        if (err) throw err;
        res.end();
    });
});

// app.delete("/api/notes/:id", function (req, res) {
//     res.json(yoda);
// });

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Listener
// ===========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});