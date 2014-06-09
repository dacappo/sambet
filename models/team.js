/**
 * Created by Lukas on 09.06.2014.
 */
module.exports = function(sequelize, DataTypes) {
    var Team = sequelize.define("Team", {name: {
        type     : DataTypes.STRING,
        allowNull: false
    }});
    return Team;
}