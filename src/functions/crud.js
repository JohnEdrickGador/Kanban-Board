const BASE_URL = 'http://localhost:8080';

export const changeTask = async (id, parameter, new_value) => {
    try {
        const response = await fetch(`${BASE_URL}/updateTask`,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                parameter: parameter,
                new_value: new_value,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Task updated successfully: ', data)
        return data[1]
    } catch (e) {
        console.log('Error updating task', e);
    }
}

export const addTask = async (taskTitle, status) => {
    try {
        const response = await fetch(`${BASE_URL}/createTask`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                task: taskTitle,
                progress: status
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(response)
        return data
    } catch (e) {
        console.log('Error creating task: ',e)
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/deleteTask`,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data
    } catch (e) {
        console.log('Error deleting task: ',e)
    }
}

