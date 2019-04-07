$( document ).ready(function() {
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
    get(dataSeedFiles[i];
 	}

 	async function get(fileName, throwback){ 
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
  function createJsonBlock(data){
    let text = JSON.stringify(data, null, 4);
    let div = document.createElement("pre");
    div.classList.add("jsonBlock");
    div.appendChild(document.createTextNode(text));
    document.getElementById("content").appendChild(div);
  }
});