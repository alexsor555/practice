import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const fetchEvents = () => api.get('/events');
export const createEvent = (event) => api.post('/events', event);
export const updateEvent = (id, event) => api.put(`/events/${id}`, event);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

export const fetchTodos = () => api.get('/todos');
export const createTodo = (todo) => api.post('/todos', todo);
export const updateTodo = (id, todo) => api.put(`/todos/${id}`, todo);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

export const fetchUser = () => api.get('/user');
export const updateUser = (user) => api.put('/user', user);
