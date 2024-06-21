import React, {useState, useContext} from 'react'
import {TasksContext} from "./StatusContainer.jsx"
import { RefreshContext } from '../App.jsx';
import { changeTask, deleteTask } from '../functions/crud.js';

export default function TaskCard({taskTitle, status, id, index}) {
    const statuses = ['Backlog', 'In Progress', 'Done'];
    const [selectedStatus, setSelectedStatus] = useState(status);

    const [tasks, setTasks] = useContext(TasksContext);
    const [refresh, setRefresh] = useContext(RefreshContext);

    const [isDragging, setIsDragging] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [editableTitle, setEditableTitle] = useState(taskTitle)

    //remove task from task array
    const removeTaskByIndex = (index) => {
        setTasks(tasks.filter((task, currentIndex) => index !== currentIndex))
    }

    //handle the onChange event of the dropdown
    const handleChangeStatus = async (e) => {
        const newProgress = e.target.value
        setSelectedStatus(newProgress);
        try {
            await changeTask(id, "progress", e.target.value);
            setRefresh(!refresh);
        } catch (e) {
            console.error("Failed to update task status", e);
        }
    }

    //handle the drag start event of the task card
    const handleDragStart = (e) => {
        setIsDragging(true)
        e.dataTransfer.setData("text/plain", id)
    }

    //handle the drag end event of the task card
    const handleDragEnd = (e) => {
        setIsDragging(false)
        removeTaskByIndex(index);
    }

    //handle the onclick event of the delete button
    const handleDelete = async (e) => {
        try {
            await deleteTask(id)
            setTasks((currentTasks) => currentTasks.filter(task => task.id !== id));
        } catch (e) {
            console.error("Failed to delete task", e);
        }
    }

    //toggles the isEditable flag
    const handleEdit = (e) => {
        setIsEditable(!isEditable);
    }

    //sets the task title upon removing focus
    const handleTaskTitleChange = (e) => {
        setEditableTitle(e.target.value)
    }

    //saves the edit in the task title to the database
    const handleSaveEdit = async (e) => {
        try {
            await changeTask(id, "task", editableTitle)
            setTasks(tasks.map(task => task.id === id ? {...task, task: editableTitle} : task))
            setIsEditable(!isEditable);
        } catch (e) {
            console.error("Failed to update task title", e);
        }
        
    }

    const taskCardClass = `task-card ${isDragging ? 'dragging' : ''}`

    return (
        <div 
        className={taskCardClass}
        id = {id} 
        draggable="true" 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
            <div className="task-title-container">
                {isEditable ? (<input type='text' value={editableTitle} autoFocus onChange={handleTaskTitleChange} onBlur={handleSaveEdit}/>) : <p>{taskTitle}</p>}
                <div className='task-act-btn-container'>
                    <input type="button" value="edit" className='task-act-btn' onClick={handleEdit}/>
                    <input type="button" value="delete" className='task-act-btn' onClick={handleDelete}/>
                </div>
            </div>
            <select value={selectedStatus} onChange={handleChangeStatus}>
                {statuses.map((statusOption, index) => (
                    <option key={index} value={statusOption}>
                        {statusOption}
                    </option>
                ))}
            </select>
        </div>
    )
}
