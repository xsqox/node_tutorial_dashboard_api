import express from 'express';

const userRouter = express.Router();

// middleware for /users route
userRouter.use((req, res, next) => {
    console.log('accessing /users');
    next();
})

userRouter.post('/login', (req, res) => {
    res.send('Login');
});

userRouter.post('/register', (req, res) => {
    res.send('Register');
});

userRouter.get('/greet', (req, res) => {
    res.send('Greeting user');
});

export { userRouter} ;
