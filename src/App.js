import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import TodoList from './pages/TodoList';
import PersonalAccount from './pages/PersonalAccount';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <div className="main-content">
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/account" element={<PersonalAccount />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
