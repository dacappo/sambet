/**
 * Created by Lukas on 25.05.2014.
 */

module.exports = function(sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
        name: {
            type     : DataTypes.STRING,
            allowNull: false
        }
    }, {
        associate : function(models){
            Group.hasOne(models.User)
        }
    });

    return Group;
}