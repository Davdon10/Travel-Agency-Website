var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/userModel').User;

const pageRegister = {
    pagetitle: "Register",
    pageheading: "Create a new account",
    pagemessage: "Please enter the required information to create a new account.",
    hideLogin: true,
};

/* GET Register page. */
router.get('/', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

// To create a new user (Registration)
router.post('/', function (req, res, next) {
    // const post = new Post(req.body);
    const user = new User(req.body);
    const errs = user.validateSync(); // Run the validation model
    // if(err) throw err;
    if (errs) {
        return processErrors(errs, req, res);
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) throw err;
        // Replace plain password with hashed password
        user.password = hashedPassword;

        // Generate a random number for the customer Id
        const usrId = Math.floor(Math.random() * 100000000);
        //  Create a customer object
        user.userid = usrId;
        user._id = usrId;
        // Store the User object in a the DB
        user.save((err, result) => {
            if (err) {
                return processErrors(err, req, res);
                res.redirect('register', {
                    errors: err
                });
            }
            console.log(result);
            const headermessage = `Account created ${result.firstname}`;
            res.redirect("/thankyou-reg");
        });
    });
});

function processErrors(errs, req, res) {
    // If there are errors from the Model schema
    const errorArray = [];
    const errorKeys = Object.keys(errs.errors);
    errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
    return res.render("register", {
        postdata: req.body,
        ...pageRegister,
        errors: errorArray,
        ...req.body,
    });
}


module.exports = router;

