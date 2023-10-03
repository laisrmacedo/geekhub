import { Container } from '../components/Container';
import { Header } from '../components/Header';
import styled from "styled-components";
import { UserInfo } from '../components/UserInfo';
import { Posts } from '../components/Posts';
import { AsideFlags } from '../components/AllFlags';
import { useContext, useEffect, useState } from 'react';
import { BASE_URL, GlobalContext, headers } from '../context/GlobalContext';
import { Comments } from '../components/Comments';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

export const Dashboard = ({page}) => {
  const { setLoggedUser } = useContext(GlobalContext)
  const [clickedPost, setClickedPost] = useState(null)
  const { user } = useParams()

  const getUser = async (user) => {
    try {
      const response = await axios.get(BASE_URL + `/users?q=${user}`, headers)
      setLoggedUser(response.data[0])
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(()=> {
    getUser(user)
  },[])

  return(
    <Container>
      <Header></Header>
      <Content>
        <aside>
         <UserInfo/>
        </aside>
        <section>
          {page === 'posts'? <Posts setClickedPost={setClickedPost}/> : <Comments clickedPost={clickedPost}/>}
        </section>
        <aside>
          <AsideFlags/>
        </aside>
      </Content>
    </Container>
  )
}