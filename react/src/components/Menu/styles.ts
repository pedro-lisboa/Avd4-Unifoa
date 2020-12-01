import styled from 'styled-components';

interface MenuProps {
    open: boolean;
}

export const StyledMenu = styled.nav<MenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #EFFFFA;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  
  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 16px;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    letter-spacing: 0.2rem;
    color: #0D0C1D;
    text-decoration: none;
    transition: color 0.3s linear;

    img { vertical-align: -20px; }

    @media (max-width: 576px) {
      font-size: 16px;
      text-align: top;
    }

    &:hover {
      color: rgb(139,0,139);
    }
  }
  > svg {
    margin-right: 8px;
  }
`;

export const Container = styled.div``;