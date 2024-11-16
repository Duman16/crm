import React, { useState, useEffect } from 'react';
import api from '../api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    level: '',
    club: '',
    coach: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/auth/user/');
        setUser(response.data);
        setFormData({
          level: response.data.level,
          club: response.data.club,
          coach: response.data.coach,
        });
      } catch (error) {
        console.error('Ошибка получения данных профиля');
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await api.put('auth/user/', formData);
      setUser(response.data);
      alert('Профиль обновлен!');
    } catch (error) {
      console.error('Ошибка обновления профиля', error);
    }
  };

  return (
    <div>
      <h2>Профиль</h2>
      {user ? (
        <div>
          <div>
            <label>Уровень:</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
            >
              <option value="Массовый">Массовый</option>
              <option value="Любительский">Любительский</option>
              <option value="Профессиональный">Профессиональный</option>
            </select>
          </div>
          <div>
            <label>Клуб:</label>
            <input
              name="club"
              value={formData.club}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Тренер:</label>
            <input
              name="coach"
              value={formData.coach}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSave}>Сохранить</button>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default Profile;