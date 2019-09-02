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

module.exports = router;