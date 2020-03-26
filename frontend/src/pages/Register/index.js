import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const res = await api.post('ongs', data);

      alert('Seu id de login foi enviado por email');

      history.push('/');
    } catch (err) {
      alert(' Deu não :( ');
    }
  }

  return (
    <div className="container">
        <div className="content">
            <section>
              <img src={logo} alt="be the hero"/>

              <h1>Cadastro</h1>
              <p>
                 Faça seu cadastro, entre
                 na plataforma e ajude pessoas
                 a encontrarem os casos da sua
                 ONG.
              </p>

              <Link to="/" className="back-link">
                <FiArrowLeft size={16} color="#e02041" />
                Já tenho cadastro
              </Link>
            </section>

            <form onSubmit={handleRegister}>
                <input 
                  type="text" 
                  placeholder="Nome da ONG"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <input 
                  type="email" 
                  placeholder="Email da ONG"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Whatsapp"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)} 
                />
                
                <div className="input-group">
                    <input 
                      type="text" 
                      placeholder="Cidade"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    />
                    <input
                      type="text" 
                      placeholder="UF" 
                      style={{width: 80}} 
                      value={uf}
                      onChange={e => setUf(e.target.value)}
                    />
                </div>

                <button className="button" type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    </div>
  );
}
