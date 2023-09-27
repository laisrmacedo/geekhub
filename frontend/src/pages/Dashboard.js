import { Container } from '../components/Container';
import { Header } from '../components/Header';
import styled from "styled-components";
import { UserInfo } from '../components/UserInfo';

const Content = styled.div`
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px red solid; */
  section{
    height:100%;
    width: 50%;
    border-left: 1px solid #F0F0F0;
    border-right: 1px solid #F0F0F0;
    padding: 8px 0;
  }
  aside{
    height:100%;
    width: 25%;

  }
`

export const Dashboard = () => {
  return(
    <Container>
      <Header></Header>
      <Content>
        <UserInfo/>
        <section>

        </section>
        <aside></aside>
      </Content>
    </Container>
  )
}