import styled from "styled-components";
import upvote from "../assets/upvote.png"
import activeUpvote from "../assets/activeUpvote.png"
import downvote from "../assets/downvote.png"
import activeDownvote from "../assets/activeDownvote.png";
import comments from "../assets/comments.png"
import { useNavigate } from "react-router-dom";
import trash from "../assets/delete.png";
import { useContext, useEffect, useState } from "react";
// import { goToCommentsPage } from "../router/coordinator";
import axios from "axios";
import { BASE_URL } from "../App";
import { GlobalContext } from "../context/GlobalContext";
import { Flag } from "./Flag";

const Content = styled.div`min-height: 200px;
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
      /* border: 1px red solid; */
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
  .flags{
    flex-direction: column;
    align-items: start;
    justify-content: start;
    /* height: 50px; */
    div{
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }
    h1{
      font-weight: 600;
      font-size: 12px;
    }
  }

  .interactions{
    span{
      height: 30px;
      padding: 5px;
      border: 1px solid #ECECEC;
      p{
        color: #6F6F6F;
        font-size: 12px;
      }
    }
  }
  
  .votes{
    justify-content: space-between;
    width: 98px;
  }
  
  .comments{
    gap: 8px;
    min-width: 48px;
  }
`

export const DiscussionCard = ({post, isPost, path}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [flags, setFlags] = useState([])
  const { getPosts } = useContext(GlobalContext)

  const headers = {
    headers: {
      authorization: localStorage.getItem("token")
    }
  }

  const getUser = async (nickname, headers) => {
    try {
      const response = await axios.get(BASE_URL + `/users?q=${nickname}`, headers)
      setUser(response.data[0])
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const getFlags = async (headers) => {
    try {
      const response = await axios.get(BASE_URL + `/flags`, headers)
      const cardFlags = response.data.filter((item)=> post.flags.includes(item.name))
      setFlags(cardFlags)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const upvoteOrDownvote = async (path, id, body, headers) => {
    try {
      await axios.put(BASE_URL + `${path}/${id}/vote`, body, headers)
      getPosts('/posts', headers)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const toDelete = async (path, id, headers) => {
    try {
      await axios.delete(BASE_URL + `${path}/${id}`, headers)
      getPosts('/posts', headers)
    } catch (error) {
      console.log(error.response.data)
    }
  }
  
  const [time, setTime] = useState("")
  const getTime = () => {
    let timeAgo
    const now = Date.now()
    const timePost = Date.parse(post.createdAt)
    
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
    getUser(post.creatorNickname, headers)
    getFlags(headers)
  }, [])

  return (
    <Content length={post.content?.length}>
      <div>
        <span className="user-info">
          <figure>
            <img src={user.avatar}/>
          </figure>
          <span>
            <h4>{post.creatorNickname}</h4>
            <p>{time}</p>
          </span>
        </span>
        {isPost ? 
          ((post.creatorNickname === user.nickname || user.nickname === "bigboss") ? <img src={trash} onClick={() => toDelete("/posts", post.id, headers)} /> : <></>):
          ((post.creatorNickname === user.nickname || user.nickname === "bigboss") ? <img src={trash} onClick={() => toDelete("/comments", post.id, headers)} /> : <></>)
        }
      </div>
      <span className="flags">
        <h1>{post.topic.charAt(0).toUpperCase() + post.topic.slice(1)}</h1>
        <div>
          {flags.map((item)=><Flag key={item.name} item={item} showx={false.toString()}/>)}
        </div>
      </span>
      <p className="content">{post.content}</p>
      <div className="interactions">
        <span className="votes">
          <img src={post.vote === "up" ? activeUpvote : upvote} onClick={() => upvoteOrDownvote(path, post.id, { vote: true }, headers)} />
          <p>{post.upvote}</p>
          <img src={post.vote === "down" ? activeDownvote : downvote} onClick={() => upvoteOrDownvote(path, post.id, { vote: false }, headers)} />
        </span>
        {isPost &&
          <span className="comments" >
            {/* onClick={() => goToCommentsPage(navigate, post.id)} */}
            <img src={comments} />
            <p>{post.comments.length}</p>
          </span>
        }
      </div>
    </Content>
  )
}