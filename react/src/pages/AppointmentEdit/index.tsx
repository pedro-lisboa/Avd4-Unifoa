import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiCalendar, FiDisc, FiArrowLeft } from 'react-icons/fi';

import * as yup from 'yup';
import getValidationError from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import EventSearch from '../../components/EventSearch';
import Menu from '../../components/Menu';
import MenuButton from '../../components/MenuButton';


import api from '../../services/api';

import { Container, Content, AnimationContainer, ContentSearch, AnimationSearchContainer } from './styles';

interface CreateFormData {
  issueType: string;
  errorNumber: string;
  product: string;
  description: string;
  solution: string;
}

interface SearchFormData {
  issueType: string;
  errorNumber: string;
  product: string;
}

interface ProductData {
  productId: string;
  name: string;
}

interface TypeData {
  typeId: string;
  name: string;
}

interface SelectData {
  value: string;
  label: string;
}

interface interfaceDoctor {
  id: 'uuid';
  name: string,
  specialty: string,
}

interface interfacePacient {
  id: 'uuid';
  name: string,
}

const AppointmentEdit: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles | null>(null);
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [listDoctor, setListDoctor] = useState<interfaceDoctor[]>([]);
  const [listPacient, setListPacient] = useState<interfacePacient[]>([]);



  useEffect(() => {
    api.get('doctors').then(response => {
      setListDoctor(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('pacients').then(response => {
      setListPacient(response.data);
    });
  }, []);

  const handleMenuButtonClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleSubmit = useCallback(
    async (data: CreateFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          doctor_id: yup
            .string()
            .uuid()
            .required('Selecione um doutor'),
          pacient_id: yup
            .string()
            .uuid()
            .required('Selecione um paciente'),
          date: yup
            .string()
            .required('Insira uma data'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });


        await api.put('/appointments', data);

        addToast({
          type: 'sucess',
          title: 'Cadastrado com sucesso.',
        });
        history.push('/appointment');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationError(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer o cadastro, cheque as informações',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history]
  );


  return (
    <Container>
      <div>
        <MenuButton open={open} onClick={handleMenuButtonClick} />
        <Menu open={open} />
      </div>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="GoDoctor" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Agendamentos</h1>

            <input
              name="id"
              type="text"
            hidden/>

            <Select
              icon={FiDisc}
              name="doctor_id"
              placeholder="Doutor"
              type="text"
              exampleText="Escolha um Doutor"
              options= {listDoctor}
            />
            <Select
              icon={FiDisc}
              name="pacient_id"
              placeholder="Paciente"
              type="text"
              exampleText="Escolha um Paciente"
              options= {listPacient}
            />
            <Input
              icon={FiCalendar}
              name="date"
              placeholder="Data da consulta"
              type="dateTime-local"
            />

            <Button isLoading={loading} type="submit">
              Salvar
            </Button>

          </Form>
          <Link to="/appointiment">
            <FiArrowLeft />
            Voltar para o Agendamento
          </Link>
          <Link to="/" onClick={signOut}>
            <FiLogOut />
            Sair
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default AppointmentEdit;
