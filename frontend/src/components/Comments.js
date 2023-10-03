import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { PostComment } from "../components/PostComment"\import { goToLoginPage } from "../router/coordinator";
import { BASE_URL, GlobalContext, headers } from "../context/GlobalContext";
import styled from "styled-components";
import { Btn, InputForLongText } from "../GlobalStyle";
import { DiscussionCard } from "./DiscussionCard";
import { CommentCard } from "./CommentCard";


const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
  overflow-y:auto;

  .input-to-comment{
    width: 100%;
    min-height: 130px;
    display: flex;
    flex-direction: column;

    gap: 8px;
    textarea{
      /* border: 1px solid #7E7E88; */
      width:100%;
      height: calc(100% - 40px);
      padding: 8px 11px;
      border: none;
      border-radius: 4px;
      font-size: 11px;
      background: #fff;
      font-family: 'Open Sans', sans-serif;
    }

    textarea:focus {
      outline: none;
      border: none;
    }

    button{
      border: none;
      color: #FFF;
      background: ;
      background: ${(props) => ((props.comment.length === 0) ? `#4F709C4a` : `#4F709C`)};
      cursor: ${(props) => ((props.comment.length === 0) ? `auto` : `pointer`)};
    }
  }
  .all-comments{
    width: 100%;
  }
`

export const Comments = () => {
  const navigate = useNavigate()
  const { user, postId } = useParams()
  const [clickedPost, setClickedPost] = useState(null)
  const { allPosts } = useContext(GlobalContext)

  const getPostById = async (path, headers) => {
    try {
      const response = await axios.get(BASE_URL + path, headers)
      setClickedPost(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    getPostById(`/posts/${postId}`, headers)
  }, [])

  const [comment, setComment] = useState("")

  const onChangeComment = (e) => {
    setComment(e.target.value)
  }

  const body = {
    content: comment
  }

  const createComment = async () => {
    try {
      await axios.post(BASE_URL + `/comments/${postId}/post`, body, headers)
      setComment("")
      getPostById(`/posts/${postId}`, headers)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
      <Content comment={comment}>
        <DiscussionCard
          key={clickedPost && clickedPost.id}
          post={clickedPost}
          isPost={false}
        />
        <div className="input-to-comment">
          <textarea
            placeholder="Add a comment..."
            type="text"
            name="post"
            value={comment}
            isLimit={comment.length > 280 ? true : false}
            onChange={onChangeComment}
          />
          <Btn onClick={() => createComment()}>Comment</Btn>
        </div>
        <div className="all-comments">
          {clickedPost?.comments.reverse().map((comment) => {
            return <CommentCard
              key={comment.id}
              comment={comment}
              clickedPost={clickedPost}
            />
          }).reverse()}
        </div>
      </Content>
  )
}