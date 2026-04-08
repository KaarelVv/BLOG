import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());


app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('Received Comment ModerationEvent', type);

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    axios.post('http://localhost:4004/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    }).catch(err => {
      console.log('Error posting event to event bus', err.message);
    });
  }

  res.json({ status: 'OK' });
});




app.listen(4006, () => {
  console.log('Moderation Service');
  console.log('Running on port 4006');
}
);