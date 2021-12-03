const tasks = require("./routes/tasks");
const { promisify } = require('util');
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const https = require("https");
const app = express();
const copydb = require("mongo-copydb");
const exec = promisify(require('child_process').exec);
var is_server_b_down = false;
var sourceUrl = 'mongodb+srv://sdproyect1:sdproyect1@cluster0.osxht.mongodb.net/todo-app';
var targetUrl = 'mongodb+srv://sdproyect1:sdproyect1@server1.axslo.mongodb.net/todo-app';
var dbname = "todo-app";
var username = 'sdproyect1';
var  password = 'sdproyect1';
connection();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", tasks);

const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`Listening on port ${port}...`);
setInterval(checkAlive, 60000);
});

function checkAlive() {
    console.log("Revisando si el servidor B está encendido...")
    https.get("https://sd-todo-backup.herokuapp.com/api/tasks", function(res){
      if( res.statusCode == 200 ){
        console.log("Servidor B encendido! Revisando si el servidor B estuvo apagado...");
        console.log("Realizando proceso de replicación...");
        replica();
        console.log("Replicación finalizada!");
        }
   else{
      console.log("El sitio podría estar apagado, devuelve código "+res.statusCode);
    }
     
     });
  }
  
  async function replica(){
    let cmd = `mongodump --archive --uri=${sourceUrl}  --quiet | mongorestore --archive --uri=${targetUrl} --nsFrom='${dbname}.*' --nsTo='${dbname}.*' --quiet --drop`
    return exec(cmd).catch((error) => {
      console.log(error);
    });;
  }