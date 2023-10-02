import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { Flag } from "./Flag"
import { getFlags } from "../context/GlobalContext"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items:center;
  width: 100%;
  height: 100%;
  padding: 28px;
  overflow-y: auto;
  div{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px #E5E5E5 solid;
    border-radius: 10px;
    padding: 0 16px;
    color: #7E7E88;
    font-size: 12px;
    background: #f0f0f0;
    margin-bottom: 10px;
    h3{
      font-size: 12px;
      font-weight: 500;
      background-color: #f0f0f0;
    }
  }
`

export const AsideFlags = () => {
  const [allFlags, setAllFlags] = useState([])

  useEffect(()=>{
    getFlags(setAllFlags)
  },[])

  return(
    <Content>
      <div>
        <h3>Topics</h3>
      </div>
      {allFlags.map((item)=><Flag key={item.name} item={item} showx={false.toString()}/>)}
    </Content>
  )
}