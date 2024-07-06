import React, { useState, useEffect } from 'react';
import './TodoModal.css';

function TodoModal({ onClose, onSave, todo }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [event, setEvent] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setName(todo.name);
      setDescription(todo.description);
      setEvent(todo.event);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSave = () => {
    onSave({ id: todo?.id, name, description, event, completed });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{todo ? 'Редактировать дело' : 'Создать дело'}</h2>
        <label>Наименование</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={256} />
        <label>Описание</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2048} />
        <label>Событие</label>
        <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} />
        <label>
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
          Завершено
        </label>
        <button onClick={handleSave} disabled={!name}>Сохранить</button>
        <button onClick={onClose}>Отменить</button>
      </div>
    </div>
  );
}

export default TodoModal;
