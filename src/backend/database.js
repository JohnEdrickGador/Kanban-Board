import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getBacklogs() {
    const result = await pool.query("SELECT * FROM Tasks WHERE progress = 'Backlog'")
    const rows = result[0]
    return rows
}

export async function getInProgress() {
    const result = await pool.query("SELECT * FROM Tasks WHERE progress = 'In Progress'")
    const rows = result[0]
    return rows
}

export async function getDone() {
    const result = await pool.query("SELECT * FROM Tasks WHERE progress = 'Done'")
    const rows = result[0]
    return rows
}

export async function getTasks() {
    const result = await pool.query("SELECT * FROM Tasks")
    const rows = result[0]
    return rows
}

export async function getTask(id) {
    const result = await pool.query(`SELECT * FROM Tasks WHERE id = ${id}`)
    const rows = result[0]
    return rows
}

export async function updateTask(id, parameter, new_value) {
    const result = await pool.query(`UPDATE tasks SET ${parameter} = ? WHERE id = ?`, [new_value, id])
    return result[0]
}

export async function createTask(task,progress) {
    const result = await pool.query(`INSERT INTO Tasks (task, progress) VALUES (?, ?)`, [task,progress])
    const id = result[0].insertId
    return {
        id: id,
        task: task,
        progress: progress
    }
}

export async function deleteTask(id) {
    const result = await pool.query(`DELETE FROM Tasks WHERE id = ${id}`)
    return result[0]
}