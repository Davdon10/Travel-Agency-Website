var agentDataServer = process.env.AGENT_DATA_URL || "http://localhost:8050/";

module.exports = function (req, res) {
    if (!req.user || req.user.role != "agent") {
        req.session.msg = "You are not allowed to acces the business data.";
        res.status(403).redirect("/");
    }
    // Use this variable to send paramters to the Python data project through the URL
    // var urlParams = "Greece/545";

    res.render("agentData", { agentDataServer: agentDataServer });
};
