import { createGlobalStyle } from 'styled-components';
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    font-weight: 500;
    font-family: 'Open Sans', sans-serif;
    color: white;
    ::-webkit-scrollbar-track {
      background: #FFF; 
    };
    ::-webkit-scrollbar{
      width: 8px;
    };
    ::-webkit-scrollbar-thumb {
      background: #EDEDED; 
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

export const Body = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background: linear-gradient(90deg, rgba(240,240,240,1) 0%, rgba(216,216,216,1) 50%, rgba(240,240,240,1) 100%);
`

export const InputForLongText = styled.textarea`
  height: 131px;
  width: 100%;
  padding: 18px;
  border: 1px solid #D5D8DE;
  border-radius: 8px;
  background-color: #EDEDED;
  /* color: ${(props) => (props.isLimit ? 'red' : '#000')}; */
`

export const InputForShortText = styled.input`
  height: 50px;
  border: 1px solid #D5D8DE;
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
  height: 50px;
  background-color: #213555;
`

