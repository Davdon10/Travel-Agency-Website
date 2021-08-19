var express = require('express');
var router = express.Router();
const ConctactUs = require('../models/contactusModel').ConctactUs;

const pageRegister = {
    pagetitle: "Contact Us",
    pageheading: "Send us your comments",
    pagemessage: "Please, fill all fields.  Thank you",
    hideLogin: true,
};

/* GET Register page. */
router.get('/', function (req, res, next) {
    res.render('contactus', { title: pageRegister.pagetitle });
});

// To send us a contactus
router.post('/', function (req, res, next) {
    // const post = new Post(req.body);
    const contact = new ConctactUs();
    contact.fullname = req.body.fullname;
    contact.phone = req.body.phone;
    contact.email = req.body.email;
    contact.comments = req.body.comments;
    contact.save((err, result) => {
        if (err) {
            return processErrors(err, req, res);
            res.redirect('register', {
                errors: err
            });
        }
        console.log(result);
        const headermessage = `Thank you for contacting us ${req.body.fullname}`;
        res.redirect("/thankyou-con?headermessage=" + headermessage);
    });
});


function processErrors(errs, req, res) {
    // If there are errors from the Model schema
    const errorArray = [];
    const errorKeys = Object.keys(errs.errors);
    errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
    return res.render("contactus", {
        postdata: req.body,
        ...pageRegister,
        errors: errorArray,
        ...req.body,
    });
}


module.exports = router;