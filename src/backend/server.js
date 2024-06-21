import express from 'express'
import cors from 'cors'
import {getBacklogs, getInProgress, getDone, getTasks, updateTask, createTask, deleteTask} from './database.js'

const app = express()

app.use(express.json())
app.use(cors())

const port = 8080;

app.get('/Backlogs', async (req, res) => {
    const tasks = await getBacklogs()
    res.send(tasks)
})

app.get('/InProgress', async (req, res) => {
    const tasks = await getInProgress()
    res.send(tasks)
})

app.get('/Done', async (req, res) => {
    const tasks = await getDone()
    res.send(tasks)
})

app.patch('/updateTask', async (req,res) => {
    const id = req.body.id;
    const parameter = req.body.parameter
    const new_val = req.body.new_value
    const update = await updateTask(id, parameter, new_val)
    res.send([update, req.body.id])
})

app.patch('/deleteTask', async (req, res) => {
    const remove = await deleteTask(req.body.id)
    res.send(remove)
})

app.post("/createTask", async (req, res) => {
    const task = req.body.task;
    const progress = req.body.progress;
    const newTask = await createTask(task, progress)
    res.send(newTask)
})

app.listen(port, () => {
    console.log(`Baytech app listening on port ${port}`)
})