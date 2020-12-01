import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiUser, FiTarget } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as yup from 'yup';
import Menu from '../../components/Menu';
import MenuButton from '../../components/MenuButton';

import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  specialty: string;
}

const Doctor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles | null>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);

  const handleMenuButtonClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleSubmitSignUp = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório'),
          specialty: yup
            .string()
            .required('Especialidade obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/doctors', data);

        addToast({
          type: 'sucess',
          title: 'Cadastro realizado!',
          description: 'Você já pode receber agendamentos!',
        });
        history.push('/');
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um problema no cadastro, tente novamente.',
          });
        } else {
          console.log(err);
        }
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
      <Background />
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="GoDoctor" />
          <Form ref={formRef} onSubmit={handleSubmitSignUp}>
            <h1>Faça o cadastro do Doutor</h1>

            <Input icon={FiUser} name="name" placeholder="Nome" type="text" />
            <Input icon={FiTarget} name="specialty" placeholder="Especialidade" type="text" />

            <Button isLoading={loading} type="submit">
              Salvar
            </Button>
          </Form>
          <Link to="/appointiments">
            <FiArrowLeft />
            Voltar para o Agendamento
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Doctor;
