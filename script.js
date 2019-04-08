class DataObj{
  title;
  id;
  file;
  data;
  constructor(title,id, file, getData){
    this.title = title;
    this.file = file;
    this.id = id;
    this.data = getData(file);
  }
  makeJsonBlock(){
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(this.title));
    h2.id = this.id;
    this.data.then(function(data){
      let pre = document.createElement("pre");
      pre.classList.add("jsonBlock");
      pre.appendChild(document.createTextNode(data));
      div.appendChild(h2);
      div.appendChild(pre);
      document.getElementById("content").appendChild(div);
    });
  }
  makeTable(){
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let a = document.createElement("a");
    a.href = "http://dtsl.ehb.be/~anthe.boets/timesheetAPI/index.html#" + this.id;
    a.appendChild(document.createTextNode(this.title));
    td.appendChild(a);
    tr.appendChild(td);
    document.getElementById("table").appendChild(tr);
  }
}
class DataType{
  dataObjList = [];
  constructor(dataObjList){
    this.dataObjList = dataObjList
  }
  makePage(){
    this.dataObjList.forEach(function(e){
      e.makeJsonBlock();
      e.makeTable();
    });
  }
}
async function getSeed(fileName){ 
  let response = await fetch("http://dtsl.ehb.be/~anthe.boets/TimesheetAPI/DataSeed/"+fileName);
  let data = await response.json();
  data = JSON.stringify(data, null, 4);
  return data;
}
async function getDatabase(fileName){ 
  let response = await fetch("https://ehbpmagroup6.azurewebsites.net/"+fileName);
  let data = await response.json();
  data = JSON.stringify(data, null, 4);
  return data;
}
dataObjListSeed = [];
dataObjListSeed.push(new DataObj("Activities","activity","ActivitySeed.json",getSeed));
dataObjListSeed.push(new DataObj("Companies","company","CompanySeed.json",getSeed));
dataObjListSeed.push(new DataObj("DefaultWorkweeks","defaultworkweek","DefaultWorkweekSeed.json",getSeed));
dataObjListSeed.push(new DataObj("Logs","log","LogSeed.json",getSeed));
dataObjListSeed.push(new DataObj("Projects","project","ProjectSeed.json",getSeed));
dataObjListSeed.push(new DataObj("ProjectUsers","projectuser","ProjectUserSeed.json",getSeed));
dataObjListSeed.push(new DataObj("roles","role","RoleSeed.json",getSeed));
dataObjListSeed.push(new DataObj("Users","user","UserSeed.json",getSeed));
let seed = new DataType(dataObjListSeed);
dataObjListDatabase = [];
dataObjListDatabase.push(new DataObj("Logs","log","Log/test",getDatabase));
dataObjListDatabase.push(new DataObj("Users","user","User/test",getDatabase));
dataObjListDatabase.push(new DataObj("Projects","project","Project/test",getDatabase));
dataObjListDatabase.push(new DataObj("Activities","activity","Activity/test",getDatabase));
let database = new DataType(dataObjListDatabase);

$(document).ready(function() {

  let menu;
  if(getCookie("menu")){
    menu = getCookie("menu");
  }
  else{
    console.log("false");
    document.cookie = "menu=Seed";
    menu = "Seed";
  }

  document.getElementById("seed").addEventListener("click", function(){
    document.cookie = "menu=Seed";
    createContente("Seed",false);
    menu = "Seed";
  });
  document.getElementById("database").addEventListener("click", function(){
    document.cookie = "menu=Database";
    createContente("Database",false)
    menu = "Database";
  });
  
  createContente(menu, true);

  function createContente(newMenu, force){
    if(menu != newMenu || force){
      document.getElementById("content").innerHTML = "";
      document.getElementById("table").innerHTML = "";
      document.getElementById(menu.toLowerCase()).classList.remove("active");
      document.getElementById(newMenu.toLowerCase()).classList.add("active");
      switch(newMenu){
        case "Seed":
        seed.makePage();
        break;
        case "Database":
        database.makePage();
        break;
      }
    }
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