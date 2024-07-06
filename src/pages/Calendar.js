import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventModal from '../components/EventModal';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api';
import './Calendar.css';

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function getData() {
      const eventsResponse = await fetchEvents();
      setEvents(eventsResponse.data);
    }
    getData();
  }, []);

  const handleSave = async (event) => {
    if (selectedEvent) {
      await updateEvent(selectedEvent.id, event);
    } else {
      await createEvent(event);
    }
    const eventsResponse = await fetchEvents();
    setEvents(eventsResponse.data);
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    const eventsResponse = await fetchEvents();
    setEvents(eventsResponse.data);
  };

  return (
    <div className="calendar-page">
      <h1>Календарь</h1>
      <button onClick={() => setShowModal(true)}>Создать</button>
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={({ date }) => {
          const dayEvents = events.filter(event => new Date(event.date).toDateString() === date.toDateString());
          return (
            <ul>
              {dayEvents.map(event => (
                <li key={event.id}>
                  {event.name}
                  <button onClick={() => { setSelectedEvent(event); setShowModal(true); }}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </li>
              ))}
            </ul>
          );
        }}
      />
      {showModal && (
        <EventModal
          onClose={() => { setShowModal(false); setSelectedEvent(null); }}
          onSave={handleSave}
          event={selectedEvent}
        />
      )}
    </div>
  );
}

export default CalendarPage;
