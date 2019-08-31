const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets full movie list from the Database for home page
router.get('/', (req, res) => {
  console.log('GETing movies');
  let queryText = `SELECT * FROM "movies" ORDER BY "title" asc;`;
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
  let queryText = `SELECT "movies".id, "movies".title, "movies".poster, "movies".description, array_agg("genres".name) AS genres 
  FROM "movies"
  JOIN "genres_movies" ON "genres_movies".movies_id = "movies".id
  JOIN "genres" ON "genres".id = "genres_movies".genres_id
  WHERE "movies".id = $1
  GROUP BY "movies".id;`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
    console.log('GOT from DB');
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('unable to get details', error);
  })
})

//updates movies table with new title and description
router.put('/', (req, res) => {
  console.log('UPDATEing', req.body);
  let queryText = `UPDATE "movies" SET "title" = $1, "description" = $2
WHERE "id" = $3;`;
pool.query(queryText, [req.body.title, req.body.description, req.body.id])
.then((result) => {
  console.log('Update complete');
  res.sendStatus(200);
})
.catch((error) => {
  console.log('Update failed', error);
  res.sendStatus(500);
})
})


module.exports = router;