import axios from "axios";
//URLs de los servidores para definir cuál servidor está activo
var https = require('https');
const apiUrl2 = "https://sd-todo-backup.herokuapp.com/api/tasks";
const apiUrl1 = "https://sd-todo-server.herokuapp.com/api/tasks";

export function getTasks() {
    https.get("https://sd-todo-server.herokuapp.com/api/tasks", function(res){
        if( res.statusCode === 200 ){

            return axios.get(apiUrl1);
        }
        else{
            return axios.get(apiUrl2);
        }
    });
    

}

export function addTask(task) {
    https.get("https://sd-todo-server.herokuapp.com/api/tasks", function(res){
        if( res.statusCode === 200 ){
            axios.post(apiUrl1, task).then(console.log("post success"));
        }
        else{
            axios.post(apiUrl2, task).then(console.log("post success"));
        }
    });  
    return task
}

export function updateTask(id, task) {
    https.get("https://sd-todo-server.herokuapp.com/api/tasks", function(res){
        if( res.statusCode === 200 ){
            return axios.put(apiUrl1 + "/" + id, task);
        }
        else{
            return axios.put(apiUrl2 + "/" + id, task);
        }
    });
   
}

export function deleteTask(id) {
    https.get("https://sd-todo-server.herokuapp.com/api/tasks", function(res){
        if( res.statusCode === 200 ){
            return axios.delete(apiUrl1 + "/" + id);
        }
        else{
            return axios.delete(apiUrl2 + "/" + id);
        }
    });
}
