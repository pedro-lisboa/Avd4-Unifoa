import React, { useCallback, useRef, useState, useEffect, EventHandler } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiCalendar, FiDisc } from 'react-icons/fi';

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
  id: string;
  doctor_id: string;
  pacient_id: string;
  date: string;
  specialty: string,
}

interface SearchFormData {
  date: string;
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

interface listAppointments {
  item: {
    id: 'uuid';
    date: Date,
    doctor_id: string,
    pacient_id: string,
    update_at: Date,
    create_at: Date
  }
  doctor: interfaceDoctor,
  pacient: interfacePacient,
}

const Appointment: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles | null>(null);
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [listDoctor, setListDoctor] = useState<interfaceDoctor[]>([]);
  const [listPacient, setListPacient] = useState<interfacePacient[]>([]);
  const [listAppointments, setListAppointments] = useState<listAppointments[]>([]);
  const [formData, setFormData] = useState<CreateFormData>();
  const [selectedDoctor, setSelectedDoctor] = useState<string>();



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

  useEffect(() => {
    api.get('appointments').then(response => {
      setListAppointments(response.data);
    });
  }, [listAppointments]);

  const handleSelectedDoctor = useCallback(() => {
    //onst specialty = listDoctor.find(element => element.id = id)?.specialty;
    //setSelectedDoctor(specialty);
    console.log(selectedDoctor);
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

        if(data.id == undefined){
          await api.post('/appointments', data);
          setFormData({id: '', date: '', doctor_id: '', pacient_id:'', specialty: '' });
        }else{
          await api.put('/appointments', data);
          setFormData({id: '', date: '', doctor_id: '', pacient_id:'', specialty: '' });
        }

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

  const handleSearch = useCallback(
    async (data: SearchFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        addToast({
          type: 'sucess',
          title: 'Pesquisa realizada com sucesso.',
        });
        history.push('/events');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationError(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na pesquisa',
          description:
            'Ocorreu um erro ao fazer a pesquisa, cheque as informações',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history]
  );

  const handleDoctorDetail = useCallback(
    async doctorId => {
      if (!doctorId) {
        return null;
      }
      const result = (await api.get('/appointments/'+doctorId)).data.item;
      console.log(result)
      setFormData({date: new Date(result.date).toDateString(), id: result.id, doctor_id: result.doctor_id, pacient_id: result.pacient_id, specialty: '' });
    },
    [history],
  );

  const handleEdit = useCallback(
    async (id: string) => {
      try {
        console.log(id);
        setLoading(true);

        setFormData(await api.get('/appointments/'+id));


        addToast({
          type: 'sucess',
          title: 'Detalhe da consulta carregado com sucesso.',
        });
        history.push('/events');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationError(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na consulta',
          description:
            'Ocorreu um erro ao carregar a consulta',
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
              value={formData?.id}
            hidden/>

            <Select
              icon={FiDisc}
              name="doctor_id"
              placeholder="Doutor"
              type="text"
              exampleText="Escolha um Doutor"
              options= {listDoctor}
              value={formData?.doctor_id}
            />

            <Select
              icon={FiDisc}
              name="pacient_id"
              placeholder="Paciente"
              type="text"
              exampleText="Escolha um Paciente"
              options= {listPacient}
              value={formData?.pacient_id}
            />
            <Input
              icon={FiCalendar}
              name="date"
              placeholder="Data da consulta"
              type="dateTime-local"
              value={formData?.date}
            />

            <Button isLoading={loading} type="submit">
              Salvar
            </Button>

            <Button isLoading={loading} type="submit" hidden>
              Excluir
            </Button>

          </Form>
          <Link to="/" onClick={signOut}>
            <FiLogOut />
            Sair
          </Link>
        </AnimationContainer>
      </Content>
      <ContentSearch>
        <AnimationSearchContainer>
            <h1>Consultas</h1>
          <Form ref={formRef} onSubmit={handleSearch}>
            {listAppointments.map(appointment => (
              <>
              <EventSearch date={appointment.item.date} Doctor={appointment.doctor.name} Pacient={appointment.pacient.name} id={appointment.item.id} onClick={()=>handleDoctorDetail(appointment.item.id)}/>
              <Button onClick={()=>handleDoctorDetail(appointment.item.id)} > Editar </Button>
              </>
            ))}
          </Form>

        </AnimationSearchContainer>
      </ContentSearch>
    </Container>
  );
};

export default Appointment;
