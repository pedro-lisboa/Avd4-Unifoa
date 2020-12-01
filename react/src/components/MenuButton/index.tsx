import React, { ButtonHTMLAttributes } from 'react';
// import { bool, func } from 'prop-types';
import { StyledMenuButton } from './styles';


type MenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  open: boolean,
};

const MenuButton: React.FC<MenuButtonProps> = ({ open, ...props }) => {
  return (
    <StyledMenuButton open={open} {...props}>
    {/* <StyledMenuButton open={open} onClick={() => setOpen(!open)}> */}
      <div />
      <div />
      <div />
    </StyledMenuButton>
  )
}

export default MenuButton;
