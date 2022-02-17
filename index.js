const express = require("express")
const app = express();
app.use(express.json());

const db = require('./queries');

app.get('/', function (req, res, next) {
    res.status(200).send('Server is listening!');
    console.log('Server listens!');
});

app.get('/api/movies', db.getAllMovies);
app.post('/api/movie', db.addMovie);
app.put('/api/movies/:id', db.updatemovie);
app.delete('/api/movies/:id', db.deletemovie);

app.listen(3000, function (res, req) {
    console.log('App is listening!');
});