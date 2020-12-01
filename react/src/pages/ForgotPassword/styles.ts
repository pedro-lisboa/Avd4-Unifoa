import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import SignInBackgroundImage from '../../assets/background.svg';

export const Container = styled.div`
  height: auto;
  min-height: 100vh;

  display: flex;
  align-items: stretch;
  background: linear-gradient(to right, rgb(139,0,139) , rgb(0, 0, 140));
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
   0% {
    opacity: 0;
    transform: translateX(-50px);
   }
   100% {
    opacity: 1;
    transform: translateX(0px);
   }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 1s ease;
  
  img {
    margin-top: 32px;
    max-width:200px;
    max-height:150px;
    width: auto;
    height: auto;
  }
  
  form {
    margin: 16px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    & > a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    svg {
      margin-right: 8px;
    }
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignInBackgroundImage}) no-repeat center;
  background-size: cover;
`;
