/**
 * Created by Lukas on 25.05.2014.
 */
var db = require('../models')

exports.create = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log(req.params.username);
    db.User
        .create({
            username: req.params.username,
            email: req.params.email
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

exports.findAll = function(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log("Not yet implemented!");
}

exports.findUser = function(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    db.User
        .find({ where: { username: req.params.username} })
        .complete(function(err, user) {
            if (!!err) {
                console.log('An error occurred while searching for the user:', err)
                res.send("An error occurred while searching for the user:", err);
            } else if (!user) {
                console.log('No user has been found.')
                res.send("No user has been found.");
            } else {
                console.log('Hello ' + user.username + '!')
                console.log('All attributes of john:', user.values)
                res.send({users: user});
            }
        })
}

exports.deleteUser = function(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log("Not yet implemented!");
}