// import { Footer } from "../components/Footer"
import styled from "styled-components";
// import axios from "axios";
// import { BASE_URL } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
// import { goToLoginPage } from "../router/coordinator";
import { useEffect } from "react";

import { InputForShortText } from "../GlobalStyle";
import { goToLogin } from "../router/coordinator";
import { BASE_URL, GlobalContext, getUser, headers } from "../context/GlobalContext";

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
  /* border: 1px red solid; */

  figure{
    display: flex;
    gap: 16px;
    height: 70px;
    width: 70px;
    img{
      border-radius: 10px;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .user-id{
    text-align: center;
    h4{
      font-size: 12px;
      font-weight: 500;
    }
    p{
      font-size: 10px;
      color: #7E7E88;
    }
  }

  .user-details{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    font-size: 10px;
    color: #7E7E88;
    span{
      width: 100%;
    }
  }
  .borderTopBottom{
    border-top: 1px solid #F0F0F0;
    border-bottom: 1px solid #F0F0F0;
    padding: 8px 0;
  }
`

export const UserInfo = () => {
  const navigate = useNavigate()
  const {user} = useParams()
  const { loggedUser, setLoggedUser } = useContext(GlobalContext)

  const logout = () => {
    localStorage.setItem("token", "")
    goToLogin(navigate)
  }

  useEffect(()=>{
    getUser(user, headers, setLoggedUser)
  },[user])

  return (
    <Content>
      <figure>
        <img src={loggedUser?.avatar}/>
      </figure>
      <div className="user-id">
        <h4 className="name">{loggedUser?.nickname}</h4>
        {/* <p className="nickname">@pessoa</p> */}
      </div>
      <div className="user-details">
        <span>{loggedUser?.email}</span>
        {/* <span className="borderTopBottom">30 posts</span>
        <span>77 comments</span> */}
      </div>
      <span onClick={() => logout()}>Logout</span>
    </Content>
  )
}