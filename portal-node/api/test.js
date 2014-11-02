var express = require('express');
var router = express.Router();

/*
 * GET testlist.
 */
router.get('/testlist', function(req, res) {
    var db = req.db;
    console.log('hello!');
    res.json([
      {id: 1, name: 'Test 1'},
      {id: 2, name: 'Test 2'},
      {id: 3, name: 'Test 3'},
      {id: 4, name: 'Test 4'}
    ]);
});

module.exports = router;