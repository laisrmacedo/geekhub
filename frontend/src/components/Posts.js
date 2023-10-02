import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../router/coordinator";
import { Btn, InputForLongText } from "../GlobalStyle";
import styled from "styled-components";
import { DiscussionCard } from "./DiscussionCard";
import axios, { all } from "axios";
import { BASE_URL } from "../App";
import { GlobalContext, getPosts, headers } from "../context/GlobalContext";
import ReactModal from 'react-modal';
import "../modal.css"
import { NewPost } from "./NewPost";

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
  
  .new-post{
    width: 100%;
    height: 40px;
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    div{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px #E5E5E5 solid;
      border-radius: 10px;
      height: 100%;
      padding: 0 16px;
      color: #7E7E88;
      font-size: 12px;
      background: #f0f0f0;
    }
    span{
      font-size: 20px;
      color: #4F709Caa;
    }
  }
  .container-posts{
    width: 100%;
    height: calc(100% - 40px);
    overflow-y: auto;
    overflow-x: hidden;
    /* display: flex; */
    gap: 8px;
    flex-direction: column;
    justify-content: start;
  }
`

ReactModal.setAppElement('#root')

export const Posts = () => {
  const navigate = useNavigate()
  const { allPosts, setAllPosts, clickedFlag } = useContext(GlobalContext)
  const [content, setContent] = useState("")
  const [filteredPosts, setFilteredPosts] = useState([])

  const onChangePost = (e) => {
    setContent(e.target.value)
  }

  const body = {
    content: content
  }

  useEffect(() => {
    if (localStorage.getItem("token") === "" || allPosts === null) {
      goToLogin(navigate)
    } else {
      getPosts('/posts', headers, setAllPosts)
    }
  }, [])

  const [modalIsOpen, setIsOpen] = useState(false)
  const [optionModal, setOptionModal] = useState(Number)

  function handleCloseModal() {
    setIsOpen(false)
  }

  function handleOpenModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    if(clickedFlag){
      const array = allPosts.filter((post) => {
        return post.flags.includes(clickedFlag.name)
      })
      setFilteredPosts(array)
    }else{
      setFilteredPosts(allPosts)
    }
  }, [clickedFlag])

  return (
    <Content>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        {/* <ContainerModal closeModal={handleCloseModal}/> */}
        <NewPost closeModal={handleCloseModal} />
      </ReactModal>
      <div className="new-post" onClick={() => handleOpenModal()}>
        <div>Add a new post<span>+</span></div>
      </div>
      <div className="container-posts">
        {filteredPosts.map((post) => {
          return (
            <DiscussionCard
              key={post.id}
              post={post}
              path={'/posts'}
              isPost={true}
            />
          )
        })
        }
      </div>
    </Content>
  )
}