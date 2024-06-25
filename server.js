const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('.'));
app.use(express.json());

app.post('/submit', (req, res) => {
    const message = req.body.message;
    if (message) {
        const messages = JSON.parse(fs.readFileSync('messages.json'));
        messages.push({ message });
        fs.writeFileSync('messages.json', JSON.stringify(messages));
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/messages', (req, res) => {
    const messages = JSON.parse(fs.readFileSync('messages.json'));
    res.json({ messages });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
