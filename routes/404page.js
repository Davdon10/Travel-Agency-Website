var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function (req, res, next) {
    res.render('404page', {
        title: '404 Page Not Found',
        passedMsg: 'We could not find what you were looking for.'
    });
});

module.exports = router;
