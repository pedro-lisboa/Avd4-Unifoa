import React, {  ButtonHTMLAttributes, MouseEvent  } from 'react';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

import api from '../../services/api';

interface EventProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  date: Date;
  Doctor: string;
  Pacient: string;
  id: 'uuid';
}

const EventSearch: React.FC<EventProps> = ({ date, Doctor, Pacient, id, children }) => {
  const history = useHistory();

  async function handleDelete(
    e: MouseEvent<HTMLButtonElement>,
    name: string,
  ): Promise<void> {
    e.preventDefault();

    const filteredRepositories = api.delete('/appointments/' + id);
    history.push('/appointment');
  }

  return (
    <Container key={id} >
    <span>{new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}</span>
    <span>{Doctor}</span>
    <span>{Pacient}</span>
      {children}

      <button
        type="button"
        onClick={e => handleDelete(e, id)}
      >
        <FiTrash2 size={24}/>
      </button>
    </Container>
  );
};

export default EventSearch;
