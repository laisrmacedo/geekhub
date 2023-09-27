import logoLogin from '../assets/logoLogin.png'
import styled from "styled-components";
import { useState } from "react";
import { BASE_URL } from "../App";
import { useNavigate } from "react-router-dom";
import { goToPostsPage, goToSignupPage } from "../router/coordinator";
import { Container } from '../components/Container';
// import { HorizontalLine, InputForShortText, Radius25Btn } from "../components/styledcomponents";
// import axios from "axios";
// import { Footer } from "../components/Footer"

const ContainerLoginPage = styled.div`
  height: 94%;
  width: 364px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    button{
      width: 90%;
    }
    
    div{
      width: 90%;
    }
  }
  
  img{
    height: 142px;
  }
  
  >p{
    color: black;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 100;
  }
  
  .inputs{
    display: flex;
    flex-direction: column;
    gap: 8px;
    width:100%;
    height: 160px;
    margin: 60px 0 40px 0;
    color: #45525B;

    input{
      margin: 0 auto;
      font-weight: 400;
      color: #808080;
      width: 90%;
    }

    p{
      margin: 0 auto;
      color: red;
      font-size: 10px;
    }
  }

  .login{
    background: linear-gradient(90deg, #FF6489, #F9B24E);
  }
  
  .signup{
    background-color: #FFFFFF;
    border: 1px solid #FE7E02;
    color: #FE7E02;
  }
`

export const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("")

  const handleClick = (e) => {
    e.preventDefault()
    // login()
  }

  const onChangeForm = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const body = {
    email: form.email,
    password: form.password
  }

  // const login = async () => {
  //   try {
  //     const response = await axios.post(BASE_URL + `users/login`, body)
  //     localStorage.setItem("token", response.data.token)
  //     goToPostsPage(navigate)
  //   } catch (error) {
  //     console.log(error.response.data)
  //     setError(error.response.data)
  //   }
  // }

  return (
    <>
      <Container>
        
      </Container>
      {/* <Footer /> */}
    </>
  )
}