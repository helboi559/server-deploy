var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/post-message', function(req,res) {
  const clientMsg = req.body.clientMessage
  const dateTime = new Date()
  const serverMessage = `Received client message: ${clientMsg}. Responded at ${dateTime.toString()}`
  res.json({serverMessage:serverMessage})
})

module.exports = router;
