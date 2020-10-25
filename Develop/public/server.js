const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// ===========================================================
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile("../db/db.json", (err) => {
        if (err) throw err;
        res.end();
    });
    
});

// app.post("/api/notes", function (req, res) {
//     const noteData = req.body;
//     console.log(noteData);
//     fs.appendFile("../db/db.json", noteData);
//     console.log(res);
// });

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