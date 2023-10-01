import { styled } from "styled-components"

const Content = styled.p`
  border: 1px solid ${(props) => (`#${props.color}`)};
  font-size: 10px;
  padding: 0 8px;
  background: #fff;
  border-radius: 4px;
  background: ${(props) => (`#${props.color}1a`)};
  color: ${(props) => (`#${props.color}`)};
  display: flex;
  gap: 4px;
  align-items:center;
  span{
    display: ${(props) => (props.showX? 'flex' : 'none')};
  }
  
`

export const Flag = ({item, showX, onclickX}) => {
  return(
    <Content color={item.color} showX={showX}>
      {item.flag}
      <span onClick={() => onclickX(item.flag)}>x</span>
    </Content>
  )
}