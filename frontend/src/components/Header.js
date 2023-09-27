import styled from "styled-components";
import logo from "../assets/logo.png"
import profileIcon from "../assets/profileIcon.png"
import themeIcon from "../assets/themeIcon.png"

const Content = styled.header`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: #F0F0F0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  >img{
    height: 50%;
  }
  button{
    height: 32px;
    width: 80px;
    background: #4F709C;
  }
  figure{
    display: flex;
    gap: 16px;
    height: 30%;
    img{
      height: 100%;
    }
  }
`

export const Header = () => {
  return(
    <Content>
      <img src={logo}/>
      <figure>
        <img src={themeIcon}/>
        <img src={profileIcon}/>
      </figure>
    </Content>
  )
}