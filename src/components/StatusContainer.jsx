import React, {useState, useEffect, createContext, useContext} from 'react'
import { changeTask, addTask} from '../functions/crud';
import TaskInput from './TaskInput';
import TaskCard from './TaskCard';
import { RefreshContext } from '../App';

export const TasksContext = createContext();

export default function StatusContainer({status}) {
    const [tasks, setTasks] =  useState([]);
    const [refresh, isRefresh] = useContext(RefreshContext); //flag from the app.jsx file that should be changed whenever a change is executed
    
    const BASE_URL = 'http://localhost:8080';
    let statusClass = "";
    let endpoint = "";

    //set the statusClass and endpoint for the API
    switch(status) {
        case 'Backlog':
            statusClass = "backlog";
            endpoint = "Backlogs";
            break;
        case 'In Progress':
            statusClass = "in-progress";
            endpoint = "InProgress";
            break;
        case 'Done':
            statusClass = "done";
            endpoint = "Done";
            break;
        default:
            statusClass = "";
            endpoint = "";
    }

    //sends a GET request for the {status} status container
    const fetchTasks = async () => {
        try {
            const results = await fetch(`${BASE_URL}/${endpoint}`);
            if (!results.ok) throw new Error('Network response was not ok');
            const data = await results.json();
            setTasks(data);
        } catch (e) {
            console.log("Error fetching tasks:",e);
        } finally {
            
        }
    }

    //allows the container to acknowledge something being hovered on top of it
    const handleDragOver = (e) => {
        e.preventDefault()
    }

    //handles the drop event on the container
    const handleDrop = async (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        const parameter = "progress";
        const new_value = status;
        await changeTask(taskId, parameter,new_value);
        fetchTasks();
    }

    //refreshes the status container everytime the refresh flag is toggled
    useEffect(() => {
        fetchTasks();
    },[refresh])

    return (
        <TasksContext.Provider value={[tasks,setTasks]}>
            <div className={`task-columns ${statusClass}`} onDragOver={handleDragOver} onDrop={handleDrop}>
                {status}
                <TaskInput onAddTask={addTask} status={status}/>
                {tasks.map((task,index) => (
                    <TaskCard taskTitle={task.task} status={status} key={task.id} id={task.id} index={index}/>
                ))}
            </div>
        </TasksContext.Provider>
    )
}
