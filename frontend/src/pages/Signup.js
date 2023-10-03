import styled from "styled-components";
import { Container } from '../components/Container';
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputForShortText, Btn } from "../GlobalStyle";
import axios from "axios";
import { BASE_URL } from "../context/GlobalContext";
import { goToLogin } from "../router/coordinator";
import { goToDashboard } from "../router/coordinator";

const Content = styled.div`
  height: 100%;
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */

  >figure{
    height: 25%;
    img{
      height: 60%;
    }
  }

  >h2{
    font-family: 'Lilita One', cursive;
    color: #213555;
  }

  .inputs{
    display: flex;
    flex-direction: column;
    gap: 8px;
    width:100%;
    height: 250px;
    margin-top: 40px;

    p{
      text-align: center;
      color: red;
      font-size: 10px;
    }

    input{
      font-weight: 400;
      color: #808080;
    }

    span{
      width: 100%;
      display: flex;
      gap: 8px;
      margin-top: 20px;
    }

    div{
      height: 50px;
      width: 100%;
      p{
        font-size: 12px;
        color: rgb(33, 53, 85);
        text-align: left;
      }
    }
  }
  .signup-btn{
    background: rgb(33, 53, 85);
    color: #f0f0f0;
  }
  .login-btn{
    background: rgb(229, 210, 131,0.5);
  }  
`

export const Signup = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState("")

  const onChangeForm = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const body = {
    nickname: form.nickname,
    email: form.email,
    password: form.password
  }

  const signup = async () => {
    try {
      const response = await axios.post(BASE_URL + `/users/signup`, body)
      localStorage.setItem("token", response.data.token)
      goToDashboard(navigate, form.nickname)
    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data)
    }
  }

  const error1 = "ERROR: 'nickname' must be at least 4 characters."
  const error2 = "ERROR: 'email' must be like 'example@example.example'."
  const error3 = "ERROR: 'password' must be between 8 and 12 characters, with uppercase and lowercase letters and at least one number and one special character."
  const error4 = "ERROR: 'nickname' already exists."
  const error5 = "ERROR: 'email' already exists."

  return (
    <Container>
      <Content>
        <figure>
          <img src={logo} />
        </figure>
        <h2>Hey there!</h2>
        <h2>Welcome aboard!</h2>
        <div className="inputs">
          <InputForShortText
            placeholder="Nickname"
            required
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={onChangeForm}
          />
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
          <div>
            {error === error1? <p>Nickname must be at least 4 characters.</p> : null}
            {error === error2? <p>Email must be like 'example@example.example'.</p> : null}
            {error === error3? <p>Password must be between 8 and 12 characters, with uppercase and lowercase letters and at least one number and one special character.</p> : null}
            {error === error4? <p>Nickname already exists.</p> : null}
            {error === error5? <p>Email already exists.</p> : null}
          </div>
          <span>
            <Btn className="login-btn" onClick={() => goToLogin(navigate)}> Login </Btn>
            <Btn className="signup-btn" onClick={() => signup()}> Signup </Btn>
          </span>
        </div>
      </Content>
    </Container>
  )
}