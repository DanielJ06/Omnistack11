import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Login() {
  const history = useHistory()

  const [id, setId] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post('/session', { id });
      
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.name);

      history.push('/profile')
    } catch (err) {
      alert('Falhou, tenta daqui a pouco que vai :) ')
    }
  }

  return (
    <div className="container">
      <section className="form">
        <img 
          src={logo} 
          alt="Be-The-Hero"
          />  

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input 
            type="text" 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
