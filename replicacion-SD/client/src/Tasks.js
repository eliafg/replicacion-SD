import { Component } from "react";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./services/taskServices";
var https = require('https');
const server_url = "https://sd-todo-server.herokuapp.com/api/tasks";
const backup_server_url = "https://sd-todo-backup.herokuapp.com/api/tasks";


class Tasks extends Component {
    
    constructor(props) {
        super(props);
        this.selected_server = server_url;
    
      }
    state = { tasks: [], currentTask: "" };
    componentDidMount() {
            fetch(this.selected_server)
          .then(res => res.json())
          .then(result => {
            this.setState({
              tasks: result
            });
          });
        }  

    /*componentDidUpdate() {
        https.get("https://sd-todo-server.herokuapp.com/api/tasks", function(res){
        if( res.statusCode === 200 ){
            this.selected_server = server_url;
        }
        else{
            this.selected_server = backup_server_url;
        }});
    }*/
    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    };


    select_server(){ 
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {  
            const  {data}  = await addTask({ task: this.state.currentTask });
            const tasks = originalTasks;
            tasks.push(this.state.currentTask);
            this.setState({ tasks, currentTask: "" });
        } catch (error) {
            console.log(error);
        }
    };

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed;
            this.setState({ tasks });
            await updateTask(currentTask, {
                completed: tasks[index].completed,
            });
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== currentTask
            );
            this.setState({ tasks });
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
}

export default Tasks;
