/**
 * Created by Lukas on 24.05.2014.
 */

var restify = require('restify');
var logfmt = require("logfmt");
var mysql = require('mysql'),
    routes  = require('./routes'),
    user    = require('./routes/user')
    , http    = require('http')
    , path    = require('path')
    , db      = require('./models')

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
    res.send('This is an API only. No further actions. Bye.');
});

//User Paths
//server.get({path: 'users' , version : '0.0.1'} , routes.index); TODO: default behaviour
server.get({path: 'users/find' , version : '0.0.1'} , user.find);
server.post({path: 'users/create' , version: '0.0.1'} , user.create);
server.post({path: 'users/update' , version: '0.0.1'} , user.update);
server.del({path: 'users/delete' , version: '0.0.1'} , user.delete);
