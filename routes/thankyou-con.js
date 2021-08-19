var express = require('express');
var router = express.Router();

/* GET Thank you page. */
router.get('/', function (req, res, next) {
    res.render('thankyou-con', {
        title: 'Thank you for contacting us!',
        passedMsg: 'We will get back to you promptly.'
    });
});

module.exports = router;