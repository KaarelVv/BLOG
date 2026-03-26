import express from 'express';
import { randomBytes } from 'crypto';
import axios from 'axios';

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use(express.json());

const posts = [];
app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const title = req.body.title;
    const post = {
        id: randomBytes(16).toString('hex'),
        title
    };
    posts.push(post);
    axios.post('http://localhost:4004/events', {
        type: 'PostCreated',
        data: post
    }).catch((err) => {
        console.log('Error posting event', err.message);
    });
    res.status(201).json({
        post: post
    });
});

app.post('/events', (req, res) => {
    console.log('Recived event', req.body);
    res.json();
});


app.listen(4000, () => {
    console.log('Running PostService');
    console.log('Running on port 4000');
}
);
