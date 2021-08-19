var mgrDataServer = process.env.MANAGER_DATA_URL || "http://localhost:8050/";

module.exports = function (req, res) {
    if (!req.user || req.user.role != "manager") {
        req.session.msg = "You are not allowed to acces the business data.";
        res.status(403).redirect("/");
    }
    // Use this variable to send paramters to the Python data project through the URL
    //var urlParams = "Greece/545";
    res.render("mgrData", { mgrDataServer: mgrDataServer });
};
