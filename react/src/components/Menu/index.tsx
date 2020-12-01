import React from 'react';
import { StyledMenu } from './styles';
import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

interface MenuProps {
  open: boolean;
}

const Menu: React.FC<MenuProps> = ({ open }: MenuProps) => {
  return (
    <StyledMenu  open={open}>
      <Link to="/doctor">
        <FiAlertTriangle/>
        &nbsp;Doutor
      </Link>
      <Link to="/pacient">
        <FiAlertTriangle/>
        &nbsp;Paciente
      </Link>
      <Link to="/appointment">
        <FiAlertTriangle/>
        &nbsp;Agendamento
      </Link>
    </StyledMenu>
  )
}
export default Menu;
