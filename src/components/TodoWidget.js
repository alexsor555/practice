import React from 'react';
import { Link } from 'react-router-dom';
import './TodoWidget.css';

function TodoWidget({ todos }) {
  return (
    <div className="todo-widget">
      <h2>Список дел</h2>
      <p>Задачи на сегодня:</p>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
      <Link to="/todo">Перейти к списку дел</Link>
    </div>
  );
}

export default TodoWidget;
