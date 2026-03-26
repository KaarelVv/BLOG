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

const postComments = [];

app.get('/posts/:id/comments', (req, res) => {
    res.json(postComments.filter(comment => comment.postId === req.params.id));
});

app.post('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const content = req.body.content;
    const comment = {
        id: randomBytes(4).toString('hex'),
        postId,
        content
    };
    postComments.push(comment);

    axios.post('http://localhost:4004/events', {
        type: 'CommentCreated',
        data: comment
    }).catch(err => {
        console.log('Error posting event', err.message);
    });
    res.status(201).json({ comment: comment });
});

app.post('/events', (req, res) => {
    console.log('Recived event', req.body);
    res.json();
});

app.listen(4001, () => {
    console.log('Comments Service ');
    console.log('Running on port 4001');
}
);
