/**
 * Created by Lukas on 09.06.2014.
 */
exports.find = function(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    db.Team
        .find({ where: { id: req.header('id')} })
        .complete(function(err, team) {
            if (!!err) {
                console.log('An error occurred while searching for the team:', err)
                res.send("An error occurred", err);
            } else if (!team) {
                console.log('No team has been found.')
                res.send("No team has been found.");
            } else {
                console.log('Found team' + team.name)
                console.log('Attributes:', team.values)
                res.send({team: team});
            }
        })
}