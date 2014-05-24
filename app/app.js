/**
 * Created by Lukas on 24.05.2014.
 */

var restify = require('restify');
var logfmt = require("logfmt");
var mysql = require('mysql');

var HOST;
var USERNAME;
var PASSWORD;
var DATABASE;

var connect_string_splitted = process.env.DATABASE_URL.split(":");
USERNAME = connect_string_splitted[1].split("//")[1];
PASSWORD = connect_string_splitted[2].split("@")[0];
HOST = connect_string_splitted[2].split("@")[1].split("/")[0];
DATABASE = connect_string_splitted[2].split("@")[1].split("/")[1].split("?")[0];

var connection = mysql.createConnection({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE
});

var port = Number(process.env.PORT || 5000);

var server = restify.createServer({
    name : "myapp"
});

server.use(logfmt.requestLogger());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.listen(port, function() {
    console.log("Listening on " + port);
});

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

    jobs.find().limit(20).sort({postedOn : -1} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }else{
            return next(err);
        }

    });

}

function findUser(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    jobs.findOne({_id:mongojs.ObjectId(req.params.jobId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }
        return next(err);
    })
}

function postNewUser(req , res , next){
    var job = {};
    job.title = req.params.title;
    job.description = req.params.description;
    job.location = req.params.location;
    job.postedOn = new Date();

    res.setHeader('Access-Control-Allow-Origin','*');

    jobs.save(job , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , job);
            return next();
        }else{
            return next(err);
        }
    });
}

function deleteUser(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    jobs.remove({_id:mongojs.ObjectId(req.params.jobId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(204);
            return next();
        } else{
            return next(err);
        }
    })

}

