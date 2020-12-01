import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  padding: 56px;
  width: 100%;  
  margin-top: 8px;

  border: 2px solid #232129;

  &:hover {
    span {
      opacity: 0.5;
      display: block;
    }
  }
`;
