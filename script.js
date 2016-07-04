$(document).ready(function(){     
  var streaming_users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  
  $.each(streaming_users,function(idx,val){
    getStream(val);
  });
  
  function getStream(username) {
    $.getJSON('https://api.twitch.tv/kraken/streams/'+username+'?callback=?', function(data) {
      displayStreamInfo(data);
    });
  }
  
  function displayStreamInfo(infoObj) {
    var tr, td1, td2, td3, picture, username, game;
    
    tr = $("<tr/>");
    td1 = $("<td/>");
    td2 = $("<td/>");
    td3 = $("<td/>");
    
    if (infoObj.stream !== null) {
      picture = "<img src='"+ infoObj.stream.preview.small+"' alt='Image'/>";
      username = "<a href='https://www.twitch.tv/"+infoObj.stream.channel.display_name+"' title='"+infoObj.stream.channel.display_name+"' target='_new'>" + infoObj.stream.channel.display_name + "</a>";
      game = infoObj.stream.channel.game;
      tr.addClass("online");
    }
    else {
      picture = "No Image", username = infoObj["_links"].channel.slice(infoObj["_links"].channel.lastIndexOf("/") + 1,infoObj["_links"].channel.length), game = "Offline";
      tr.addClass("offline");
    }
    
    td1.append(picture);
    td2.append(username);
    td3.append(game);
    tr.append(td1,td2,td3);
    $("#stream_list").append(tr);
  }
});

function displayStreams(whichS) {
	switch (whichS) {
		case "all":
			$(".online, .offline").css('display','table-row');
			$(".btn").removeClass("btn-primary");
			$("#all_s").removeClass("btn-default").addClass("btn-primary");
			break;
		case "on":
			$(".online").css('display','table-row');
			$(".offline").css('display','none');
			$(".btn").removeClass("btn-primary");
			$("#on_s").removeClass("btn-default").addClass("btn-primary");
			break;
		case "off":
			$(".offline").css('display','table-row');
			$(".online").css('display','none');
			$(".btn").removeClass("btn-primary");
			$("#off_s").removeClass("btn-default").addClass("btn-primary");
			break;
	}
}