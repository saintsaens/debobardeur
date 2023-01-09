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

  var lines = text.split('\r\n');

  for (let i = 0; i < lines.length; i++) {
    lines[i] = debobardize.debobardize(lines[i])
  }
  
  const reunitedText = lines.join('\r\n');

  // Render the response using a Jade template
  res.render('index', { text: reunitedText });
})

module.exports = router;