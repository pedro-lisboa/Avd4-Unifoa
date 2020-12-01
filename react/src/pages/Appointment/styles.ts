import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/background.svg';

interface FormProps {
    hasError: boolean;
}

export const Container = styled.div`
  height: auto;
  min-height: 100vh;
  width: auto;
  min-width: 100vh;

  display: flex;
  background: linear-gradient(to right, rgb(139,0,139) , rgb(0, 0, 140));
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 24px;

  width: 70%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

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

    a {
      color: #F4EDE8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#F4EDE8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 8px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color:  ${shade(0.2, '#ff9000')};
    }
  }
`;

export const ContentSearch = styled.div`
  //display: flex;
  margin-top: 124px;
  flex-direction: column;
  align-items: top;
  justify-content: center;
  width: 100%;
  max-width: auto;
`;

export const AnimationSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  form {
    margin: 16px 16px;
    width: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 90%;
    max-width: auto;

    div {      
      display: flex;
      align-items: center;
      justify-content: center;
      justify-content: space-evenly;
    }

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #F4EDE8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#F4EDE8')};
      }

      button {
        margin-bottom: 0px;
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 8px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color:  ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;

export const Error = styled.span`
    display: block;
    color: #c53030;
    margin-top: 8px;
`;
