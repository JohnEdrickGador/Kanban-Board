import React, { useContext, useState } from 'react'
import { TasksContext } from './StatusContainer';

export default function TaskInput({onAddTask, status}) {
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useContext(TasksContext);

    //handles adding tasks to the database and updates the task list for the frontend
    const handleSubmit = async () => {
        if (taskTitle.trim()) {
            try{
                const newTask = await onAddTask(taskTitle, status);
                if (newTask) {
                    setTasks(prevTasks => [...prevTasks, newTask]);
                    setTaskTitle('');
                }   
            } catch (e) {
                console.error("Failed to create new task",e);
            }
            
        }
    }

    return (
        <div className='task-input-container'>
            <input 
                type="text" 
                name="task" 
                id="task-title" 
                value={taskTitle} 
                placeholder='Enter task here' 
                onChange={(e) => setTaskTitle(e.target.value)}
            />

            <input type="button" value="+" onClick={handleSubmit}/>
        </div>
    )
}
