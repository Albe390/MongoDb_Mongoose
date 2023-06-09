const express = require('express')
const mongoose = require('mongoose')
const Movie = require('./models/movie')

const PORT = 3000;
const URL = 'mongodb://localhost:27017/moviebox';
const app = express();
app.use(express.json());
mongoose
  .connect(URL)
  .then(() => console.log('Connected to MongoDb'))
.catch(err => console.log(`DB connection Error: ${err}`))

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});

const handleError = (res, error) => {
  res.status(500).json({ error });
}
// Rout для получения данных из монго дв
app.get('/movies', (req, res) => {
 Movie
    .find() // Cursores -> hasnext, next, forEach
    .sort({ title: 1 })
    .then((movies) => {
      res
        .status(200)
        .json(movies);
    })
    .catch(() => handleError(res, "Somthing goes wrong..."));
});
app.get('/movies/:id', (req, res) => {
  Movie
      .findById(req.params.id)
      .then((movie) => {
        res
          .status(200)
          .json(movie);
      })
      .catch(() => handleError(res, "Somthing goes wrong..."));
  } )
  

app.delete('/movies/:id', (req, res) => {
  Movie
      .findByIdAndDelete(req.params.id)
      .then((result) => {
        res
          .status(200)
          .json(result);
      })
      .catch(() => handleError(res, "Somthing goes wrong..."));
  } )
app.post('/movies', (req, res) => {
  const movie = new Movie(req.body);
  movie
    .save()
    .then((result) => {
      res
        .status(201)
        .json(result);
    })
    .catch(() => handleError(res, "Somthing goes wrong..."));
})
// Для отновления данных
app.patch('/movies/:id', (req, res) => { 
Movie
    .findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res
        .status(200)
        .json(result);
    })
    .catch(() => handleError(res, "Somthing goes wrong..."));
})
