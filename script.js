class DataObj{
  title;
  id;
  file;
  data;
  constructor(title,id, file){
    this.title = title;
    this.file = file;
    this.id = id;
    this.data = getSeed(file);
  }
}

class Seed{
  dataObjList = [];
  constructor(){
    this.dataObjList.push(new DataObj("Activities","activity","ActivitySeed.json"));
    this.dataObjList.push(new DataObj("companies","company","CompanySeed.json"));
    this.dataObjList.push(new DataObj("DefaultWorkweeks","defaultworkweek","DefaultWorkweekSeed.json"));
    this.dataObjList.push(new DataObj("Logs","log","LogSeed.json"));
    //this.dataObjList.push(new DataObj("Projects","projects","ProjectSeed.json"));
    this.dataObjList.push(new DataObj("ProjectUsers","projectuser","ProjectUserSeed.json"));
    this.dataObjList.push(new DataObj("roles","role","RoleSeed.json"));
    this.dataObjList.push(new DataObj("Users","user","UserSeed.json"));
  }
}
class Database{
  dataObjList;
  constructor(){
    
  }
}
async function getSeed(fileName){ 

   let test = await fetch("http://dtsl.ehb.be/~anthe.boets/TimesheetAPI/DataSeed/"+fileName);
   let test2 = test.json();
    /*$.ajax({
    async: true,
    crossDomain: true,
    method: "GET",
    url: "http://dtsl.ehb.be/~anthe.boets/TimesheetAPI/DataSeed/"+fileName,
    success: function(data){
      console.log(data);
      return JSON.stringify(data, null, 4);
    },
    error: function(data){
      console.log(data)
      return null;
    },
  });*/
  console.log(test);
  console.log(test2);
  return test2;
}

let seed = new Seed();

let database = new Database();

console.log(seed);
console.log(database);

$(document).ready(function() {

sleep(1000);
console.log("test");
console.log(seed);
console.log(database);



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
 	

  let controllers = [];
  controllers.push("");
  /*
 	for(let i = 0; i < dataSeedFiles.length; i++){
    getSeed(dataSeedFiles[i]);
 	}
  createContente();
  */
 
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

  function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

  function createJsonBlock(data){
    let text = JSON.stringify(data, null, 4);
    let div = document.createElement("pre");
    div.classList.add("jsonBlock");
    div.appendChild(document.createTextNode(text));
    document.getElementById("content").appendChild(div);
  }
  function createContente(){

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