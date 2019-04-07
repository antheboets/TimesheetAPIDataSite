$(document).ready(function() {

  let menu;
  if(getCookie("menu")){
    menu = getCookie("menu");
    console.log("true");
  }
  else{
    console.log("false");
    document.cookie = "menu=Seed";
    menu = "Seed";
  }
  console.log(menu);
 	let dataSeedFiles = [];
 	dataSeedFiles.push("ActivitySeed.json");
 	dataSeedFiles.push("CompanySeed.json");
 	dataSeedFiles.push("DefaultWorkweekSeed.json");
 	dataSeedFiles.push("LogSeed.json");
 	//dataSeedFiles.push("ProjectSeed.json");
 	dataSeedFiles.push("ProjectUserSeed.json");
 	dataSeedFiles.push("RoleSeed.json");
 	dataSeedFiles.push("UserSeed.json");

  let controllers = [];
  controllers.push("");

 	for(let i = 0; i < dataSeedFiles.length; i++){
    getSeed(dataSeedFiles[i]);
 	}

 	function getSeed(fileName){ 
 		$.ajax({
 			async: true,
			crossDomain: true,
		  method: "GET",
	  	url: "http://dtsl.ehb.be/~anthe.boets/TimesheetAPI/DataSeed/"+fileName,
	  	success: function(data){
	  		console.log(data);
        createJsonBlock(data);
	  	},
	  	error: function(data){
	  		console.log(data)
	  	},
    });
  }
  function getTable(route){ 
    $.ajax({
      async: true,
      crossDomain: true,
      method: "GET",
      url: "https://ehbpmagroup6.azurewebsites.net"+route,
      success: function(data){
        console.log(data);
        createJsonBlock(data);
      },
      error: function(data){
        console.log(data)
      },
    });
  }

  function createJsonBlock(data){
    let text = JSON.stringify(data, null, 4);
    let div = document.createElement("pre");
    div.classList.add("jsonBlock");
    div.appendChild(document.createTextNode(text));
    document.getElementById("content").appendChild(div);
  }
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
});