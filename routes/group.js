/**
 * Created by Lukas on 01.06.2014.
 */
var db = require('../models')
var User = require('./user')

exports.find = function(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    db.Group
        .find({ where: { id: req.header('id')} })
        .complete(function(err, group) {
            if (!!err) {
                console.log('An error occurred while searching for the group:', err)
                res.send("An error occurred", err);
            } else if (!group) {
                console.log('No group has been found.')
                res.send("No group has been found.");
            } else {
                console.log('Found Group' + group.name)
                console.log('Attributes:', group.values)
                res.send({group: group});
            }
        })
}

//Non API Function
exports.findByID = function(id, callback){
    db.Group.find({ where: { id: id} }).success(function(group) {
        callback(group);
    });
};

exports.create = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    User.findByID(req.header('created_by'), function(creator){
        db.Group
            .create({
                name: req.header('name')
            })
            .complete(function(err, group) {
                if (!!err) {
                    console.log('The instance has not been saved:', err)
                    res.send({message: "error"});
                } else {
                    console.log('We have a persisted instance now')
                    creator.setGroup(group).success(function(){
                        console.log("Successfully linked group to user")
                    });
                    res.send({message: "group created!"});
                }
            })
    });
}

exports.delete = function(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    db.Group
        .find({ where: { id: req.header('id')} })
        .complete(function(err, group) {
            if (!!err) {
                console.log('An error occurred while searching for the group:', err)
                res.send("An error occurred");
            } else if (!group) {
                console.log('No group has been found.')
                res.send("No group has been found.");
            } else {
                group.destroy().success(function () {
                    res.send("group successfully deleted!");
                })
            }
        })
}