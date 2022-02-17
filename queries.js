const Pool = require('pg').Pool;
const pool = new Pool({
    movie: "postgres",
    host: "localhost",
    database: "api",
    password: "postgres",
    port: 5433
})

const getAllMovies = function (req, res) {
    pool.query('select * from movies where upvotes, release_date ASC', function (err, response) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            console.log(response.rows);
            res.status(200).json(response.rows);
        }
    });
}

const addMovie = function (req, res) {
    const { name, genre, release_date, upvotes, downvotes, reviews } = req.body;
    pool.query('insert into movies (name, genre, release_date, upvotes, downvotes, reviews) values ($1)', [name, genre, release_date, upvotes, downvotes, reviews], function (err, response) {
        if (err) {
            console.log(err);
            throw (err);
        }
        console.log(response.rowCount);
        res.status(201).json('movie added: rowCount' + response.rowCount);
    })
}

const updatemovie = (request, response) => {
    const id = parseInt(request.params.id)
    const { name } = request.body;

    pool.query(
        'UPDATE movies SET name = $1 WHERE id = $2',
        [name, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`movie modified with ID: ${id}`)
        }
    )
}

const deletemovie = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM movies WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`movie deleted with ID: ${id}`)
    })
}

module.exports = {
    getAllMovies,
    addMovie,
    updatemovie,
    deletemovie
}