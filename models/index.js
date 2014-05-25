/**
 * Created by Lukas on 24.05.2014.
 */

if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize')
        , sequelize = null

    if (process.env.DATABASE_URL) {
        // the application is executed on Heroku ... use the cleardb url
        var connect_string_splitted = process.env.DATABASE_URL.split(":");
        USERNAME = connect_string_splitted[1].split("//")[1];
        PASSWORD = connect_string_splitted[2].split("@")[0];
        HOST = connect_string_splitted[2].split("@")[1].split("/")[0];
        DATABASE = connect_string_splitted[2].split("@")[1].split("/")[1].split("?")[0];

        sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
            dialect:  'mysql',
            protocol: 'mysql',
            port:     3306,
            host:     HOST
        })

        sequelize
            .authenticate()
            .complete(function(err) {
                if (!!err) {
                    console.log('Unable to connect to the database:', err)
                } else {
                    console.log('Connection has been established successfully.')
                }
            })
    } else {
        // the application is executed on the local machine ... use mysql
        console.log('Local Database not supported')
    }

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,
        User:      sequelize.import(__dirname + '/user'),
        Group:     sequelize.import(__dirname + '/group')
        // add your other models here
    }

    /*
     Associations can be defined here. E.g. like this:
     global.db.User.hasMany(global.db.SomethingElse)
     */
}
module.exports = global.db