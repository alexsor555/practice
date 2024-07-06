import React, { useState, useEffect } from 'react';
import { fetchUser, updateUser } from '../api';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './PersonalAccount.css';

function PersonalAccount() {
  const [user, setUser] = useState({
    surname: '',
    name: '',
    patronymic: '',
    birthdate: '',
    age: 0,
    avatar: '',
  });

  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    async function getData() {
      const userResponse = await fetchUser();
      setUser(userResponse.data);
    }
    getData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    await updateUser(user);
  };

  const completedTasksData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    datasets: [
      {
        label: 'Завершенные дела',
        data: [3, 2, 2, 4, 5, 6, 5, 4, 7, 8, 6, 9],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="personal-account">
      <h1>Личный кабинет</h1>
      <form>
        <label>
          Фамилия:
          <input
            type="text"
            value={user.surname}
            onChange={(e) => setUser({ ...user, surname: e.target.value })}
          />
        </label>
        <label>
          Имя:
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </label>
        <label>
          Отчество:
          <input
            type="text"
            value={user.patronymic}
            onChange={(e) => setUser({ ...user, patronymic: e.target.value })}
          />
        </label>
        <label>
          Дата рождения:
          <input
            type="date"
            value={user.birthdate}
            onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
          />
        </label>
        <label>
          Возраст:
          <input
            type="number"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: parseInt(e.target.value) })}
          />
        </label>
      </form>
      <div className="avatar-section">
        <img src={user.avatar} alt="Avatar" className="avatar" />
        <input type="file" onChange={handleFileChange} />
      </div>
      <button onClick={handleSave}>Сохранить</button>
      <div className="chart">
        <Line data={completedTasksData} />
      </div>
    </div>
  );
}

export default PersonalAccount;
