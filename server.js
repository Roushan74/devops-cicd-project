
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware: Read JSON data
app.use(express.json());

// Temporary notes storage
let notes = [];

// Home route
app.get("/", (req, res) => {
    res.send("DevOps Notes API is running!");
});

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy"
    });
});

// Get all notes
app.get("/notes", (req, res) => {
    res.json(notes);
});

// Create a new note
app.post("/notes", (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            error: "Title and content are required"
        });
    }

    const newNote = {
        id: Date.now(),
        title,
        content
    };

    notes.push(newNote);

    res.status(201).json(newNote);
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
