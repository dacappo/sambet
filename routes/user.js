/**
 * Created by Lukas on 25.05.2014.
 */
var db = require('../models')

exports.find = function(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    db.User
        .find({ where: { username: req.header('username')} })
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
                res.send({user: user});
            }
        })
}

//Non API Function
exports.findByID = function(id){
    return db.User
        .find({ where: { id: id} })
        .complete(function(err, user) {
            if (!!err) {
                console.log('An error occurred while searching for the user:', err);
                return
            } else if (!user) {
                console.log('No user has been found.');
                return
            } else {
                console.log('Hello ' + user.username + '!');
                console.log('All attributes of john:', user.values);
                return user;
            }
        })
}

exports.create = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    db.User
        .create({
            username: req.header('username'),
            email: req.header('email'),
            imea: req.header('imea')
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

exports.update = function(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    db.User
        .find({ where: { id: req.header('id')} })
        .complete(function(err, user) {
            if (!!err) {
                console.log('An error occurred while searching for the user:', err)
                res.send("An error occurred while searching for the user:", err);
            } else if (!user) {
                console.log('No user has been found.')
                res.send("No user has been found.");
            } else {
                user.updateAttributes({
                    username: req.header('username'),
                    email: req.header('email')
                }).success(function(){
                        res.send("User successfully updated");
                })
            }
        })
}

exports.delete = function(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    db.User
        .find({ where: { id: req.header('id')} })
        .complete(function(err, user) {
            if (!!err) {
                console.log('An error occurred while searching for the user:', err)
                res.send("An error occurred while searching for the user:", err);
            } else if (!user) {
                console.log('No user has been found.')
                res.send("No user has been found.");
            } else {
                user.destroy().success(function () {
                    res.send("User successfully deleted!");
                })
            }
        })
}