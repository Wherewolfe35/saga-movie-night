const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets full movie list from the Database for home page
router.get('/', (req, res) => {
  console.log('GETing movies');
  let queryText = `SELECT * FROM "movies";`;
  pool.query(queryText)
    .then((result) => {
      console.log('GOT from DB');
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('unable to GET', error);
      res.sendStatus(500);
    })
})

//gets movie details for selected movie for details page
router.get('/:id', (req, res) => {
  console.log('GETting details');
  let queryText = `SELECT "movies".id, "movies".title, "movies".poster, "movies".description, "genres".name 
  FROM "movies"
  JOIN "genres_movies" ON "genres_movies".movies_id = "movies".id
  JOIN "genres" ON "genres".id = "genres_movies".genres_id
  WHERE "movies".id = $1;`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
    console.log('GOT from DB');
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('unable to get details', error);
  })
})


module.exports = router;