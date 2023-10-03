import { createGlobalStyle } from 'styled-components';
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    ::-webkit-scrollbar-track {
      background: #EBEBEB; 
    };
    ::-webkit-scrollbar{
      width: 8px;
    };
    ::-webkit-scrollbar-thumb {
      background: rgb(33, 53, 85,.15); 
      border-radius: 4px;
    };
    ::-webkit-scrollbar-thumb:hover {
      background: #D5D8DE; 
    }
    ::-webkit-scrollbar-thumb:active {
      background: #D5D8DE; 
    }
  }
`

export const InputForLongText = styled.textarea`
  height: 100px;
  width: 100%;
  padding: 18px;
  border: 1px solid #D5D8DE;
  border-radius: 8px;
  background-color: #fff;
`

export const InputForShortText = styled.input`
  height: 40px;
  padding: 20px 16px;
  width: 100%;
  border-radius: 10px;
  color: #000;
  font-weight: 100;
`

export const Btn = styled.button`
  border-radius: 10px;
  border: none;
  width:  100%;
  height: 40px;
  font-weight: 800;
  cursor: pointer;
`

