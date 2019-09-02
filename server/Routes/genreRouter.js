const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// queries
router.get('/', (req, res) => {
  console.log('GETing genres');
  let queryText = `SELECT * FROM "genres" ORDER BY "name" asc;`;
  pool.query(queryText)
  .then((result) => {
    console.log('successful GET from genres');
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('unable to GET from genres', error);
    res.sendStatus(500)
  })
});

router.post('/', (req, res) => {
  console.log('POSTing new genre', req.body);
  let queryText = `INSERT INTO "genres_movies" ("movies_id", "genres_id")
    VALUES ($1, $2);`;
  pool.query(queryText, [req.body.movies_id, req.body.genres_id])
  .then((result) => {
    console.log('successful POST to genres_movies');
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('error in POST', error);
    res.sendStatus(500);
  })
})

router.delete('/:mid/:gid', (req, res) => {
  let movieId = req.params.mid;
  let genreId = req.params.gid;
  console.log('DELETEing genre', movieId, genreId);
  let queryText = `DELETE FROM "genres_movies" WHERE "movies_id" = $1 AND "genres_id" = $2;`;
  pool.query(queryText, [movieId, genreId])
    .then((result) => {
      console.log('successful DELETE to genres_movies');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in DELETE', error);
      res.sendStatus(500);
    })
})

module.exports = router;