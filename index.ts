import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js';

const port = 7979;

const app = express();

// middleware globally for all routes
app.use((req, res, next) => {
    console.log(`Time is ${Date.now()}`);
    next();
});

app.use('/hello', (req, res, next) => {
    console.log('only for hello');
    next();
});

app.get('/hello', (req, res) => {
    throw new Error('Error bitch!');
});

app.use('/users', userRouter);

// error handler must be last after all use
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).send(err.message);
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
