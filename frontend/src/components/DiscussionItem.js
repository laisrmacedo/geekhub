import styled from "styled-components";
import upvote from "../assets/upvote.png"
import activeUpvote from "../assets/activeUpvote.png"
import downvote from "../assets/downvote.png"
import activeDownvote from "../assets/activeDownvote.png";
import comments from "../assets/comments.png"
import { useNavigate } from "react-router-dom";
import trash from "../assets/delete.png";
// import { goToCommentsPage } from "../router/coordinator";
// import axios from "axios";
// import { BASE_URL } from "../App";

const Content = styled.div`
  min-height: ${(props) => (props.length <= 35 ? '120px' : props.length > 200 ? '294px' : props.length + 82 + 'px')};
  width: 100%;
  border: 1px solid #E0E0E0;
  background-color: #FBFBFB;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  gap: 8px;
  
  >div{
    /* border: 1px red solid; */
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 18px;
    >img{
      height: 16px;
      width: 16px;
      filter: opacity(0.4);
    }
    
    .user-info{
      display: flex;
      gap: 8px;
      figure{
        display: flex;
        gap: 16px;
        height: 44px;
        width: 44px;
        img{
          border-radius: 10px;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      span{
        display: flex;
        flex-direction: column;
      }
      h4{
        font-size: 12px;
        font-weight: 500;
      }
      p{
        font-size: 10px;
        color: #7E7E88;
      }
    }
    
  }

  .content{
    color: #000;
    font-size: 16px;
    padding: 10px 0;
  }

  p{
    color: #6F6F6F;
    font-size: 12px;
  }

  >span{
    display: flex;
    padding: 5px;
    border: 1px solid #ECECEC;
    background-color: #FBFBFB;
    border-radius: 14px;
    height: 30px;
    align-items: center;

    img{
      height: 16px;
    }
  }

  .votes{
    justify-content: space-between;
    width: 98px;
  }

  .comments{
    justify-content: space-around;
    width: 65px;
  }
`
export const DiscussionItem = (props) => {
  const navigate = useNavigate()

  const headers = {
    headers: {
      authorization: localStorage.getItem("token")
    }
  }

  const upvoteOrDownvote = async (path, id, body, headers) => {
    // try {
    //   await axios.put(BASE_URL + `${path}/${id}/vote`, body, headers)
    // } catch (error) {
    //   console.log(error.response.data)
    // }
  }

  const toDelete = async (path, id, headers) => {
    // try {
    //   await axios.delete(BASE_URL + `${path}/${id}`, headers)
    // } catch (error) {
    //   console.log(error.response.data)
    // }
  }

  return (
    <Content length={props.content?.length}>
      <div>
        <span className="user-info">
          <figure>
            <img src="https://img.freepik.com/fotos-gratis/mulher-bonita-com-cabelo-encaracolado-mantem-a-mao-no-pescoco-sorri-gentilmente-usa-um-macacao-casual-carmesim-olha-feliz-para-a-camera_273609-39135.jpg"/>
          </figure>
          <span>
            <h4>Nome da Pessoa {props.creatorNickname}</h4>
            <p>@pessoa</p>
            <p>3h</p>
          </span>
        </span>
        {props.isPost ? 
          ((props.creatorNickname === props.user || props.user === "bigboss") ? <img src={trash} onClick={() => toDelete("posts", props.id, headers)} /> : <></>):
          ((props.creatorNickname === props.user || props.user === "bigboss") ? <img src={trash} onClick={() => toDelete("comments", props.id, headers)} /> : <></>)
        }
      </div>
        <p className="content">Entendi, se você está criando um componente React que será reutilizado em posts e comentários, um nome mais genérico pode ser "Item de Discussão" ou "Caixa de Comentário". Esses nomes não se referem apenas a posts, mas podem ser usados para qualquer tipo de conteúdo de discussão, incluindo comentários.</p>
      <span className="votes">
        <img src={props.vote === "up" ? activeUpvote : upvote} onClick={() => upvoteOrDownvote(props.path, props.id, { vote: true }, headers)} />
        <p>{props.upvote}</p>
        <img src={props.vote === "down" ? activeDownvote : downvote} onClick={() => upvoteOrDownvote(props.path, props.id, { vote: false }, headers)} />
      </span>
      {props.isPost &&
        <span className="comments" >
          {/* onClick={() => goToCommentsPage(navigate, props.id)} */}
          <img src={comments} />
          <p>{props.comments}</p>
        </span>
      }
    </Content>
  )
}