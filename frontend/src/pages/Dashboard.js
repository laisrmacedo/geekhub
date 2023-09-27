import { Container } from '../components/Container';
import { Header } from '../components/Header';
import styled from "styled-components";
import { heightHeader } from "../GlobalStyle";

const Content = styled.div`
  height: calc(100% - 80px);
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px red solid; */
`

export const Dashboard = () => {
  return(
    <Container>
      <Header></Header>
      <Content></Content>
    </Container>
  )
}