import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(1337, () => {
  console.log('Server started on port 1337');
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});