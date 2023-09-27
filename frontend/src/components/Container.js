import styled from "styled-components";
import { Body } from "../GlobalStyle";

const Main = styled.main`
  max-width: 1200px;
  width: 80%;
  height: 100%;
  background: rgba(240,240,240,0.7);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.05); 
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.05);
`

export const Container = () => {
  return(
    <Body>
      <Main></Main>
    </Body>
  )
}