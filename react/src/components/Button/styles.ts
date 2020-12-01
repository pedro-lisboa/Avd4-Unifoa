import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  color: #312e38;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 0px;
  transition: all 0.2s ease;

  & + div {
    margin-top: 8px;
  }

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
