import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../router/coordinator";
import { Btn, InputForLongText } from "../GlobalStyle";
import styled from "styled-components";
import { DiscussionItem } from "./DiscussionItem";
// import axios from "axios";
// import { BASE_URL } from "../App";


const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
  
  .new-post{
    width: 100%;
    height: 10%;
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
    span{
      display: flex;
      align-items: center;
      border: 1px #E5E5E5 solid;
      border-radius: 10px;
      width: calc(100% - 40px);
      height: 40px;
      padding-left: 16px;
      color: #7E7E88;
      font-size: 12px;
      background: #f0f0f0;
    }
    button{
      width: 36px;
      height: 36px;
      font-size: 28px;
      background: #4F709Caa;
      /* background: #4F709C; */
      color: #f0f0f0;
    }
  }
  .container-posts{
    width: 100%;
    height: 90%;
    display: flex;
    gap: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    /* border: 1px red solid; */
  }
`

export const ContainerPosts = styled.div`
  height: calc(100% - 195px);
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 364px;
  gap: 10px;
`

export const Posts = () => {
  const navigate = useNavigate()

  const [allPosts, setAllPosts] = useState([])
  const [content, setContent] = useState("")
  const [avatar, setAvatar] = useState("")

  const onChangePost = (e) => {
    setContent(e.target.value)
  }

  const headers = {
    headers: {
      authorization: localStorage.getItem("token")
    }
  }

  const body = {
    content: content
  }

  useEffect(() => {
    if(localStorage.getItem("token") === ""){
      goToLogin(navigate)
    }else{
      getAvatar('users/user', headers)
    }
  }, [])

  const createPost = async () => {
    // try {
    //   await axios.post(BASE_URL + `posts`, body, headers)
    //   setContent("")
    // } catch (error) {
    //   console.log(error.response.data)
    // }
  }

  const getPosts = async (path, headers) => {
    // try {
    //   const responde = await axios.get(BASE_URL + path, headers)
    //   setAllPosts(responde.data)
    // } catch (error) {
    //   console.log(error.response.data)
    // }
  }

  const getAvatar = async (path, headers) => {
    // try {
    //   const responde = await axios.get(BASE_URL + path, headers)
    //   setAvatar(responde.data.avatar)
    // } catch (error) {
    //   console.log(error.response.data)
    // }
  }

  useEffect(() => {
    getPosts('posts', headers)
  }, [allPosts])

  return (
      <Content>
        <div className="new-post">
          <span>Add a new post</span>
          {/* <InputForLongText
            placeholder="Escreva seu post..."
            type="text"
            name="post"
            value={content}
            isLimit={content.length > 280 ? true : false}
            onChange={onChangePost}
          /> */}
          <Btn onClick={() => createPost()}>+</Btn>
        </div>
        <div className="container-posts">
          <DiscussionItem/>
          <DiscussionItem/>
        </div>
        {/* <Box> */}
          {/* {allPosts.map((post) => {
            return (
              <PostComment
                key={post.id}
                id={post.id}
                path={'posts'}
                creatorNickname={post.creatorNickname}
                content={post.content}
                upvote={post.upvote}
                comments={post.comments.length}
                isPost={true}
                vote={post.vote}
                user={post.loggedUser}
              />
            )
          }).reverse()} */}
        {/* </Box> */}
      </Content>
  )
}