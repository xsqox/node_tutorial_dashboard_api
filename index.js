import express from 'express';

const port = 7979;

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello world, baby');
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
