import { styled } from "styled-components"
import { GlobalContext } from "../context/GlobalContext"
import { useContext } from "react"

const Content = styled.p`
  border: 1px solid ${(props) => (`#${props.color}`)};
  font-size: 10px;
  padding: 0 8px;
  border-radius: 4px;
  background: ${(props) => (`#${props.color}1a`)};
  color: ${(props) => (`#${props.color}`)};
  display: flex;
  gap: 4px;
  align-items:center;
  span{
    display: ${(props) => (props.showx? 'flex' : 'none')};
  }

  &:active{
    background: ${(props) => (`#${props.color}`)};
    color: #f0f0f0;
  }
  
`

export const Flag = ({item, showx, onclickX, isAside}) => {
  const { setClikedFlag } = useContext(GlobalContext)

  return(
    <Content 
      color={item.color} 
      showx={showx === "true" ? true : false} 
      onClick={() => isAside && setClikedFlag(item.name === 'All topics' ? null : item)}
    >
      {item.name}
      <span onClick={() => onclickX(item.name)}>x</span>
    </Content>
  )
}