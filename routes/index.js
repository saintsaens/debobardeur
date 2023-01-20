const debobardize = require('../public/javascripts/debobardeur');

var express = require('express');
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Débobardeur' });
});

router.post('/', (req, res) => {
  // Get the data from the request body
  var text = req.body.text_with_bobards;

  debobardize.debobardize(text);

  var lines = text.split("\n");

  // Render the response using a Jade template
  res.render('index', { text: text });
})

module.exports = router;