/**
 * Created by Lukas on 24.05.2014.
 */

var restify = require('restify');
var logfmt = require("logfmt");
var mysql = require('mysql');

var port = Number(process.env.PORT || 5000);
var server = restify.createServer({
    name : "myapp"
});

server.use(logfmt.requestLogger());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

db.sequelize.sync().complete(function(err) {
    if (err) {
        throw err[0]
    } else {
        server.listen(port, function() {
            console.log("Listening on " + port);
        });
    }
})

server.get('/', function(req, res) {
    res.send('Hello World!');
});

var PATH = '/users';
server.get({path : PATH , version : '0.0.1'} , findAllUsers);
server.get({path : PATH +'/:userId' , version : '0.0.1'} , findUser);
server.post({path : PATH , version: '0.0.1'} ,postNewUser);
server.del({path : PATH +'/:userId' , version: '0.0.1'} ,deleteUser);

function findAllUsers(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log("Not yet implemented!");
}

function findUser(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    User
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
    User
        .create({
            username: req.params.username,
            email: req.params.email
        })
        .complete(function(err, user) {
            if (!!err) {
                console.log('The instance has not been saved:', err)
            } else {
                console.log('We have a persisted instance now')
            }
        })
}

function deleteUser(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log("Not yet implemented!");
}

