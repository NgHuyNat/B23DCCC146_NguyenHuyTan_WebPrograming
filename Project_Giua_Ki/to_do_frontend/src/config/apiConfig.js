import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3010/api',
});

export const getTodos = async () => {
    const response = await instance.get('/todo');
    return response.data;
    }

export const addTodo = async (todo) => {
    const response = await instance.post('/todo', todo);
    return response.data;
    }

export const updateTodo = async (todo) => {
    const response = await instance.put(`/todo/${todo.id}`, todo);
    return response.data;
    }

export const updateCheckbox = async (todo) => {
    const response = await instance.put(`/todo/${todo.id}/checkbox`, todo);
    return response.data;
    }

export const deleteTodo = async (id) => {
    const response = await instance.delete(`/todo/${id}`);
    return response.data;
    }
