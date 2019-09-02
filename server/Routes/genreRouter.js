const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
})

module.exports = router;