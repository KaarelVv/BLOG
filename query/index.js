import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors('*'));
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/events', (req, res) => {

    if (req.body.type === 'PostCreated') {
        const { id, title } = req.body.data;
        posts[id] = {
            id,
            title,
            comments: []
        };
    }
    if (req.body.type === 'CommentCreated') {
        const { id, content, postId } = req.body.data;
        const post = posts[postId];
        if (post) {
            post.comments.push({ id, content });
        }
    }
    console.log(posts);
    res.json();
});

app.listen(4002, () => {
  console.log('Query Service');    
  console.log('Running on port 4002');
    }
);