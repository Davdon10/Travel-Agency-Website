var express = require('express');
var router = express.Router();

/* GET Thank you page. */
router.get('/', function (req, res, next) {
    res.render('thankyou-reg', {
        title: 'Thank you for registering with Travel Experts',
        passedMsg: 'Please, login to book your next vacation adventure ...'
    });
});

module.exports = router;