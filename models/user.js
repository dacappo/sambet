/**
 * Created by Lukas on 25.05.2014.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("User", {
        username: {
            type     : DataTypes.STRING,
            allowNull: false
        },
        imea: DataTypes.STRING,
        email: {
            type: DataTypes.STRING
//            validate: {
//                isEmail: true
//            }
        },
        test: DataTypes.STRING
    })
}