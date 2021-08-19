var express = require('express');
var router = express.Router();

/* GET Thank you page. */
router.get('/', function (req, res, next) {
    res.render('underconst', {
        title: 'Under Construction',
        passedMsg: 'Sorry, this feature will be implemented in a future release ...'
    });
});

module.exports = router;