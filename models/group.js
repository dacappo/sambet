/**
 * Created by Lukas on 25.05.2014.
 */

module.exports = function(sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
        name: {
            type     : DataTypes.STRING,
            allowNull: false
        }
    });

    return Group;
}