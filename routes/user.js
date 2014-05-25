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

function findAllUsers(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log("Not yet implemented!");
}

function findUser(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log(req.params.username);

    db.User
        .find({ where: { username: req.params.username} })
        .complete(function(err, user) {
            if (!!err) {
                console.log('An error occurred while searching for the user:', err)
            } else if (!user) {
                console.log('No user has been found.')
            } else {
                console.log('Hello ' + user.username + '!')
                console.log('All attributes of john:', user.values)
            }
        })
}

function postNewUser(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
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

function deleteUser(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log("Not yet implemented!");
}