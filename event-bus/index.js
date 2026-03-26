import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

app.post('/events', (req, res) => {
  const event = req.body;
  console.log('Received Event', event.type);
  axios.post('http://localhost:4000/events', event).catch(err => {
    console.log('Error posting event to posts service', err.message);
  });
  axios.post('http://localhost:4001/events', event).catch(err => {
    console.log('Error posting event to comments service', err.message);
  });
  axios.post('http://localhost:4002/events', event).catch(err => {
    console.log('Error posting event to query service', err.message);
  });

  res.json({ status: 'OK' });
});


app.listen(4004, () => {
  console.log('Event Bus ');
  console.log('Running on port 4004');
}
);
