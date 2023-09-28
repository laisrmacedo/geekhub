import styled from "styled-components";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

export const Body = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background: linear-gradient(90deg, rgba(240,240,240,1) 0%, rgba(216,216,216,1) 50%, rgba(240,240,240,1) 100%);
  /* background: ${(props) => (props.theme ? 'linear-gradient(90deg, rgba(33,53,85,1) 0%, rgba(79,112,156,1) 50%, rgba(33,53,85,1) 100%)' : 'linear-gradient(90deg, rgba(240,240,240,1) 0%, rgba(216,216,216,1) 50%, rgba(240,240,240,1) 100%)')}; */
  overflow-x: hidden;
  font-family: 'Open Sans', sans-serif;
  color: #000;

  h1{
    font-weight: 800;
  }

  main{
    max-width: 1200px;
    width: 80%;
    height: 100%;
    background: rgba(240,240,240,0.7);
    /* background-color: ${(props) => (props.theme ? 'rgba(240,240,240,0.7)' : 'rgba(79,112,156,0.3)')}; */
    border-radius: 10px;
    backdrop-filter: blur(10px);
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.05); 
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export const Container = ({children}) => {
  const { currentTheme } = useContext(GlobalContext)
  console.log(currentTheme)

  return(
    <Body theme={currentTheme}>
      <main>
        {children}
      </main>
    </Body>
  )
}