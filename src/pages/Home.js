import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import CalendarWidget from '../components/CalendarWidget';
import TodoWidget from '../components/TodoWidget';
import { fetchEvents, fetchTodos } from '../api';
import './Home.css';

function Home() {
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getData() {
      const eventsResponse = await fetchEvents();
      const todosResponse = await fetchTodos();
      setEvents(eventsResponse.data);
      setTodos(todosResponse.data);
    }
    getData();
  }, []);

  return (
    <div className="home">
      <h1>Главная</h1>
      <div className="widgets">
        <Draggable>
          <div className="widget">
            <CalendarWidget events={events} />
          </div>
        </Draggable>
        <Draggable>
          <div className="widget">
            <TodoWidget todos={todos} />
          </div>
        </Draggable>
      </div>
    </div>
  );
}

export default Home;
