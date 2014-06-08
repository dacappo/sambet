/**
 * Created by Lukas on 08.06.2014.
 */
/**
 * Created by Lukas on 01.06.2014.
 */
var db = require('../models');
var User = require('./user');
var Group = require('./group');

exports.findAllByUserId = function(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    User.findByID(req.header('user_id'), function(user){
        db.Groupmember
            .find({ where: { user_id: user.id} })
            .complete(function(err, groupmember) {
                if (!!err) {
                    console.log('An error occurred while searching for the groupmember:', err)
                    res.send("An error occurred", err);
                } else if (!groupmember) {
                    console.log('No groupmember has been found.')
                    res.send("No groupmember has been found.");
                } else {
                    console.log('Found groupmember' + groupmember.name)
                    console.log('Attributes:', groupmember.id)
                    res.send({groupmember: groupmember});
                }
            })
    });
}

exports.create = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    User.findByID(req.header('user_id'), function(user){
        Group.findByID(req.header('group_id'), function(group){
            db.Groupmember
                .create({
                    name: req.header('name')
                })
                .complete(function(err, groupmember) {
                    if (!!err) {
                        console.log('The instance has not been saved:', err)
                        res.send({message: "error"});
                    } else {
                        console.log('We have a persisted instance now')
                        //Assign User
                        user.setGroupmembers([groupmember]).success(function(){
                            console.log("Successfully linked user to groupmember")
                        });
                        //Assign Group
                        group.setGroupmembers([groupmember]).success(function(){
                            console.log("Successfully linked group to groupmember")
                        });
                        res.send({message: "groupmember created!"});
                    }
                });
        });
    });
}

exports.delete = function(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    User.findByID(req.header('user_id'), function(user){
        Group.findByID(req.header('group_id'), function(group){
            db.Groupmember
                .find({ where: { user_id: req.header('user_id'), group_id: req.header('group_id')} })
                .complete(function(err, groupmember) {
                    if (!!err) {
                        console.log('An error occurred while searching for the groupmember:', err)
                        res.send("An error occurred");
                    } else if (!groupmember) {
                        console.log('No groupmember has been found.')
                        res.send("No groupmember has been found.");
                    } else {
                        groupmember.destroy().success(function () {
                            res.send("groupmember successfully deleted!");
                        })
                    }
                })
        });
    });
}