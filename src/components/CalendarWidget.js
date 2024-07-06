import React from 'react';
import { Link } from 'react-router-dom';
import './CalendarWidget.css';

function CalendarWidget({ events }) {
  return (
    <div className="calendar-widget">
      <h2>Календарь</h2>
      <p>События на сегодня:</p>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
      <Link to="/calendar">Перейти в Календарь</Link>
    </div>
  );
}

export default CalendarWidget;
