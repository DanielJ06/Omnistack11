import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident (e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
      })

      history.push('/profile')
    } catch (err) {
      alert('Erro ao registrar novo caso!')
    }
  }

  return (
    <div className="new-incident-container">
        <div className="content">
            <section>
              <img src={logo} alt="be the hero"/>

              <h1>Cadastrar novo caso</h1>
              <p>
                 Descreva o caso detalhadamente para
                 encontrar um herói para resolver isso.
              </p>

              <Link to="/profile" className="back-link">
                <FiArrowLeft size={16} color="#e02041" />
                Voltar para Profile
              </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Título do caso" 
                />
                <textarea 
                  type="text" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Descrição" 
                />
                <input 
                  type="text" 
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder="Valor em reais" 
                />

                <button className="button" type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    </div>
  );
}
