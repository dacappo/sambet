/**
 * Created by Lukas on 25.05.2014.
 */
var db = require('../models')

exports.create = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log("username");
    db.User
        .create({
            username: req.param('username'),
            email: req.param('email')
        })
        .complete(function(err, user) {
            if (!!err) {
                console.log('The instance has not been saved:', err)
                res.send({message: "error"});
            } else {
                console.log('We have a persisted instance now')
                res.send({message: "User created!"});
            }
        })
}