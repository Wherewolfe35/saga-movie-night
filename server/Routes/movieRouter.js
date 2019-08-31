const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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

module.exports = router;