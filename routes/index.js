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
  const text = req.body.text_with_bobards;

  const newText = debobardize.debobardize(text);

  res.render('index', { text: newText });
})

module.exports = router;