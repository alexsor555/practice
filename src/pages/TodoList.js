import React, { useState, useEffect } from 'react';
import TodoModal from '../components/TodoModal';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    async function getData() {
      const todosResponse = await fetchTodos();
      setTodos(todosResponse.data);
    }
    getData();
  }, []);

  const handleSave = async (todo) => {
    if (selectedTodo) {
      await updateTodo(selectedTodo.id, todo);
    } else {
      await createTodo(todo);
    }
    const todosResponse = await fetchTodos();
    setTodos(todosResponse.data);
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    const todosResponse = await fetchTodos();
    setTodos(todosResponse.data);
  };

  return (
    <div className="todo-list-page">
      <h1>Список дел</h1>
      <button onClick={() => setShowModal(true)}>Создать</button>
      <table>
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Описание</th>
            <th>Событие</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
              <td>{todo.event}</td>
              <td>{todo.completed ? 'Завершено' : 'Не завершено'}</td>
              <td>
                <button onClick={() => { setSelectedTodo(todo); setShowModal(true); }}>Редактировать</button>
                <button onClick={() => handleDelete(todo.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <TodoModal
          onClose={() => { setShowModal(false); setSelectedTodo(null); }}
          onSave={handleSave}
          todo={selectedTodo}
        />
      )}
    </div>
  );
}

export default TodoList;
