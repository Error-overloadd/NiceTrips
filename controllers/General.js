/*** Created by Lawrencium_X on 10/7/2025.*/
var db = require("../models");

module.exports = {

    verifyUser: function(req, res, next) {
        const user = db.model("User");

        user.findAll({logging:console.log})
            .then(function (userInfo) {
                res.send(userInfo)
            }).catch(function (err) {
                console.log("err",err);
            res.send({message:"An error occurred."})
        })
    }
}