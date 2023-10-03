import styled from "styled-components";
import upvote from "../assets/upvote.png"
import activeUpvote from "../assets/activeUpvote.png"
import downvote from "../assets/downvote.png"
import activeDownvote from "../assets/activeDownvote.png";
import comments from "../assets/comments.png"
import { useNavigate, useParams } from "react-router-dom";
import trash from "../assets/delete.png";
import { useContext, useEffect, useState } from "react";
// import { goToCommentsPage } from "../router/coordinator";
import axios from "axios";
import { BASE_URL, GlobalContext, getPosts, getUser, headers } from "../context/GlobalContext";
import { Flag } from "./Flag";
import { goToDashboardComments } from "../router/coordinator";

const Content = styled.div`
  /* min-height: 200px; */
  width: 100%;
  border: 1px solid #E0E0E0;
  background-color: #FBFBFB;
  padding: 16px 12px;
  border-radius: 8px;
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  margin-bottom: 10px;
  /* border: 1px red solid; */

  >p{
    font-size: 12px;
  }
  
  >div{
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 18px;
    >img{
      filter: opacity(0.4);
    }
    img{
      height: 16px;
      width: 16px;
      cursor: pointer;
    }
    
    
    .user-info{
      margin-bottom: 8px; 
      display: flex;
      gap: 8px;
      figure{
        display: flex;
        gap: 16px;
        height: 40px;
        width: 40px;
        img{
          border-radius: 50%;
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
        font-size: 14px;
        font-weight: 500;
      }
      p{
        font-size: 10px;
        color: #7E7E88;
      }
    }
    >span{
      display: flex;
      border-radius: 14px;
      align-items: center;
    }
  }

  .interactions{
  }
  
  .votes{
    width: 100%;
    display: flex;
    gap: 18px;
    height: 30px;
    padding: 5px;
    border: 1px solid #ECECEC;
    img{
      filter: opacity(0.4);
      height: 16px;
      width: 16px;
      cursor: pointer;
    }
    p{
      color: #6F6F6F;
      font-size: 12px;
    }
    justify-content: space-between;
    width: 98px;
  }
  
  .comments{
    gap: 8px;
    min-width: 48px;
  }
`

export const CommentCard = ({comment, clickedPost}) => {
  const navigate = useNavigate()
  const { setAllPosts, loggedUser, setDashboard } = useContext(GlobalContext)
  const [postCreator, setPostCreator] = useState(null)
  // const { user } = useParams()

  const upvoteOrDownvote = async (id, body, headers) => {
    try {
      await axios.put(BASE_URL + `/comments/${id}/vote`, body, headers)
      // getPosts('/posts', headers, setAllPosts)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const toDelete = async (id, headers) => {
    try {
      await axios.delete(BASE_URL + `/comments/${id}`, headers)
      // getPosts('/posts', headers, setAllPosts)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  
  const [time, setTime] = useState("")
  const getTime = () => {
    let timeAgo
    const now = Date.now()
    const timePost = Date.parse(comment.createdAt)
    
    if(now - timePost < 300000){
      timeAgo = 'now'
    } else if(now - timePost < 3600000){
      timeAgo = new Date(now - timePost).getMinutes() + ' minutes ago'
    } else if(now - timePost > 3600000 && now - timePost < 86400000){
      timeAgo = new Date(now - timePost).getHours() + ' hours ago'
    }else{
      timeAgo = new Date(now - timePost).getDay() + ' days ago'
    }
    
    setTime(timeAgo)
  }
  
  useEffect(() => {
    getTime()
    console.log(comment)
    // getUser(post && post.creatorNickname, headers, setPostCreator)
  }, [clickedPost])

  return (
    <Content>
      <div>
        <span className="user-info">
          <span>
            <h4>{comment.creatorNickname}</h4>
            <p>{time}</p>
          </span>
        </span>
        {(comment.creatorNickname === loggedUser?.nickname || loggedUser?.nickname === "bigboss") ? <img src={trash} onClick={() => toDelete("/comments", comment.id, headers)} /> : <></>}
      </div>
      <p className="content">{comment.content}</p>
      <span className="votes">
        <img src={comment.vote === "up" ? activeUpvote : upvote} onClick={() => upvoteOrDownvote(comment.id, { vote: true }, headers)} />
        <p>{comment.upvote}</p>
        <img src={comment.vote === "down" ? activeDownvote : downvote} onClick={() => upvoteOrDownvote(comment.id, { vote: false }, headers)} />
      </span>
    </Content>
  )
}