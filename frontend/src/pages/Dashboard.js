import { Container } from '../components/Container';
import { Header } from '../components/Header';
import styled from "styled-components";
import { UserInfo } from '../components/UserInfo';
import { Btn } from '../GlobalStyle';
import { Posts } from '../components/Posts';

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
    border-left: 1px solid #E5E5E5;
    border-right: 1px solid #E5E5E5;
    padding: 8px 20px;
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
        <aside>
         <UserInfo/>
        </aside>
        <section>
          <Posts/>
        </section>
        <aside></aside>
      </Content>
    </Container>
  )
}