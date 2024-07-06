import React, { useState, useEffect } from 'react';
import './EventModal.css';

function EventModal({ onClose, onSave, event }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allDay, setAllDay] = useState(false);

  useEffect(() => {
    if (event) {
      setName(event.name);
      setDate(event.date);
      setEndDate(event.endDate || '');
      setAllDay(event.allDay || false);
    }
  }, [event]);

  const handleSave = () => {
    onSave({ id: event?.id, name, date, endDate: allDay ? date : endDate, allDay });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{event ? 'Редактировать событие' : 'Создать событие'}</h2>
        <label>Наименование</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={256} />
        <label>Дата и время начала</label>
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>
          <input type="checkbox" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} />
          Целый день
        </label>
        {!allDay && (
          <>
            <label>Дата и время окончания</label>
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </>
        )}
        <button onClick={handleSave} disabled={!name || !date}>Сохранить</button>
        <button onClick={onClose}>Отменить</button>
      </div>
    </div>
  );
}

export default EventModal;
