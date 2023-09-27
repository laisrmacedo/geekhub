// import { Footer } from "../components/Footer"
// import { Headers } from "../components/Header"
import styled from "styled-components";
import { Container } from '../components/Container';
import logo from "../assets/logo.png"
// import axios from "axios";
// import { BASE_URL } from "../App";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputForShortText, Btn } from "../GlobalStyle";
// import { goToPostsPage } from "../router/coordinator";

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

  form{
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 30px;
  }
  .inputs{
    display: flex;
    flex-direction: column;
    gap: 8px;
    width:100%;
    height: 250px;

    p{
      text-align: center;
      color: red;
      font-size: 10px;
    }

    input{
      font-weight: 400;
      color: #808080;
    }
  }

  .terms{
    display: flex;
    flex-direction: column;
    gap:17px;

    p{
      font-size: 14px;
      color: black;
    }

    input{
      width: 18px;
      height: 18px;
    }

    span{
      display:flex;
      align-items: center;
      justify-content: space-between;
      gap: 11px;
    }
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

  const handleClick = (e) => {
    e.preventDefault()
    // signup()
  }

  const onChangeForm = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const body = {
    nickname: form.nickname,
    email: form.email,
    password: form.password
  }

  // const signup = async () => {
  //   try {
  //     const response = await axios.post(BASE_URL + `users/signup`, body)
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
        <Content>
          <figure>
            <img src={logo}/>
          </figure>
          <h2>Hey there!</h2>
          <h2>Welcome aboard!</h2>
          <form onSubmit={handleClick}>
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
              {error === "ERROR: 'nickname' must be at least 4 characters." ? <p>Apelido deve ter pelo menos 4 caracteres.</p> : null}
              {error === "ERROR: 'email' must be like 'example@example.example'." ? <p>Informe um email válido.</p> : null}
              {error === "ERROR: 'password' must be between 8 and 12 characters, with uppercase and lowercase letters and at least one number and one special character." ?
              <p>A senha deve ter entre 8 e 12 caracteres, com letras maiúscula e minúscula, pelos menos um número e um caracter especial.</p> : null}
              {error === "ERROR: 'nickname' already exists." ? <p>Apelido já cadastrado.</p> : null}
              {error === "ERROR: 'email' already exists." ? <p>Email já cadastrado.</p> : null}
            </div>
            <div className="terms">
              <p>Ao continuar, você concorda com o nosso Contrato de usuário e nossa Política de Privacidade</p>
              <span>
                <input type='checkbox' />
                <p>Eu concordo em receber emails sobre coisas legais no Labeddit</p>
              </span>
            </div>
            <Btn className="signup"> Create Account </Btn>
          </form>
        </Content>
      </Container>
      {/* <Footer /> */}
    </>
  )
}