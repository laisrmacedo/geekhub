import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from '../components/Container';
import axios from "axios";
// import { Footer } from "../components/Footer"
import logo from "../assets/logo.png"
import { InputForShortText, Btn } from "../GlobalStyle";
import { goToDashboard, goToSignup } from "../router/coordinator";
import { BASE_URL } from "../App";

const Content = styled.div`
  height: 100%;
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px red solid; */

  >figure{
    height: 25%;
    img{
      height: 60%;
    }
  }
  >input{
    margin-bottom: 8px;
  }
  >span{
    display: flex;
    gap: 12px;
    width: 100%;
    margin-top: 16px;
  }
  .login-btn{
    background: rgb(33, 53, 85);
    color: #f0f0f0;
  }
  .signup-btn{
    background: rgb(229, 210, 131,0.5);
    /* color: #f0f0f0; */
  }
  
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    
    div{
      width: 90%;
    }
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

  const login = async () => {
    try {
      const response = await axios.post(BASE_URL + `/users/login`, body)
      localStorage.setItem("token", response.data.token)
      // console.log(response)
      goToDashboard(navigate, response.data.nickname)
    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data)
    }
  }

  return (
      <Container>
        <Content>
          <figure>
            <img src={logo}/>
          </figure>
          <InputForShortText
            placeholder="E-mail"
            required
            type="text"
            name="email"
            value={form.email}
            onChange={onChangeForm}
          />
          <InputForShortText
            placeholder="Password"
            required
            type="password"
            name="password"
            value={form.password}
            onChange={onChangeForm}
          />
          <span></span>
          <span>
            <Btn id="signup" className="signup-btn" onClick={() => goToSignup(navigate)}> Signup </Btn>
            <Btn id="login" className="login-btn" onClick={() => login()}> Login </Btn>
          </span>
        </Content>
        {/* <Footer /> */}
      </Container>
  )
}