import express from 'express';

const port = 7979;

const app = express();


// has to be before other route definitions
app.all('/hello', (req, res, next) => {
    console.log('all');
    next();
});

const callback = (req, res, next) => {
    console.log('callback 1');
    next();
}

const callback2 = (req, res, next) => {
    console.log('callback 2');
    next();
}

// with middleware
app.get('/hello', [callback, callback2, (req, res) => {
    res.send('Hello world, baby');
}]);


// with wildcards
app.get('/hel?lo', (req, res) => {
    res.send('Hello world, baby'); // hello, helo
});

app.get('/hel+lo', (req, res) => {
    res.send('Hello world, baby'); // hello, helllllo, helllo
});

app.get('/hel*lo', (req, res) => {
    res.send('Hello world, baby'); // hello, helsdfadl
});

app.get(/.*a$/, (req, res) => {
    res.send('hello from regexp') // any-a
})

app.get('/json', (req, res) => {
    res.status(201).json({success: true})
});

app.get('/download', (req, res) => {
    res.download('test.txt', "Test file");
});

app.get('/redirect', (req, res) => {
    res.redirect(301, 'https://www.google.com')
});

app.get('/headers', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.append('Warning', 'alarm'); // custom header
    res.send('Headers set');
});

app.get('/cookies', (req, res) => {
    res.cookie('token', 'blahblahtoken', {
        domain: '',
        path: '/',
        secure: true,
        expire: 3000
    });
    res.clearCookie('token', { path: '/'})
    res.send('cookie set');
});

app.get('/noresponse', (req, res) => {
   res.status(404).end();
});

// app.listen(port, () => {
//     console.log(`Listening on http://localhost:${port}`);
// });
