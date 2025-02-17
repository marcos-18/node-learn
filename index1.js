const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON data

let users = [
    { id: 1, name: "Marcos" },
    { id: 2, name: "Karan" }
];

// 🟢 GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// 🟢 GET a user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// 🟢 POST - Create a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 🟢 PUT - Update a user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = req.body.name;
    res.json(user);
});

// 🟢 DELETE - Remove a user
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.json({ message: "User deleted successfully" });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});