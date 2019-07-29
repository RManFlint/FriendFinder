//LOAD DATA
//=================================================================
var allFriends = require("../data/friends.js");

//ROUTING
//=================================================================

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(allFriends);
  });

  app.post("/api/friends", function(req, res){
    var friendData = req.body;
    var friendName = friendData.name;
    var friendImage = friendData.photo;
    var friendScore = friendData.scores;

    //Default friendMatch object
		var friendMatch = {
			name: "",
			image: "",
			matchDifference: 1000
    };

    var totalDifference;
  
    //loop through allFriends array and set totalDiffernece to zero
		for(var i = 0; i < allFriends.length; i++){
      console.log(allFriends[i].name);
      totalDifference = 0;

      //find the totalDifference of user and frined scores
			for (var j = 0; j < friendScore.length; j++) {
            totalDifference += Math.abs(parseInt(friendScore[j]) - parseInt(allFriends[i].scores[j]));
            console.log("total difference is " + totalDifference);

            //if the totalDifference is less than the default matchDifference, reset name, photo, and matchDifference to the 
            //name, photo, and totalDifference of the friend
              if (totalDifference < friendMatch.matchDifference){
                friendMatch.name = allFriends[i].name;
                friendMatch.photo = allFriends[i].photo;
                friendMatch.matchDifference = totalDifference;
              };
            
            //Reset matchDifference to default at the end of the call
            friendMatch.matchDifference = 1000;
          }
      }
      //push friendData into allFriends array
      allFriends.push(friendData);
      //send the friendMatch result in json format
		  res.json(friendMatch);
	});
};
