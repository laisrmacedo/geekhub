import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Btn } from '../GlobalStyle'
import { InputWithAutosuggest } from './InputWithAutosuggest'
import { Flag } from './Flag'
import { BASE_URL, GlobalContext, getFlags, getPosts, headers } from '../context/GlobalContext'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 10px;
  padding: 24px;
  background-color: #F0F0F0;
  width: 40vw;
  min-width: 300px;
  font-family: 'Open Sans', sans-serif;

  h2{
    color: #000;
    font-size: 14px;
  }

  form{
    width:100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    input, textarea{
      min-width:100%;
      height: 100%;
      max-height: 30px;
      padding: 8px 11px;
      border: none;
      border-radius: 4px;
      font-size: 11px;
    }

    input:focus, textarea:focus {
      outline: none;
      border: none;
    }

    textarea{
      min-height: 100px;
      font-family: 'Open Sans', sans-serif;
    }

    button{
      width: 100px;
      height: 32px;
      font-size: 12px;
    }

    span{
      display: flex;
      gap: 16px;
      align-self: end;
    }
  }

  .newPostFlags{
    display: flex;
    gap: 4px;
    height: 16px;
  }

  .input-with-autosuggest{
    display: flex;
    flex-direction: column;
    gap: 2px;
    >p{
      display: ${(props) => (props.quantityflags === 3 ? 'none' : 'block')};
      margin-left: 4px;
      font-size: 8px;
      color: #757575;
    }
  }

  #postBtn{
    border: none;
    color: #FFF;
    background: ;
    background: ${(props) => ((props.topic.length === 0 || props.content.length === 0 || props.quantityflags === 0) ? `#4F709C4a` : `#4F709C`)};
    cursor: ${(props) => ((props.topic.length === 0 || props.content.length === 0 || props.quantityflags === 0) ? `auto` : `pointer`)};
  }

  #cancelBtn{
    background-color: #fff;
    color: #000;
    cursor: pointer;
  }
`

export const NewPost = (props) => {
  const [form, setForm] = useState({
    topic: "",
    content: "",
    flags: []
  })

  const [allFlags, setAllFlags] = useState([])
  const [selectedFlags, setSelectedFlags] = useState([])
  const { setAllPosts } = useContext(GlobalContext)

  const handleClick = (e) => {
    e.preventDefault()
    createPost()

    props.closeModal()
  }

  const onChangeForm = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const createPost = async () => {
    try {
      await axios.post(BASE_URL + '/posts', {
        topic: form.topic,
        content: form.content,
        flags: selectedFlags
      }, headers)

      setForm({
        topic: "",
        content: ""
      })
      setSelectedFlags([])
      getPosts('/posts', headers, setAllPosts)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const updateSelectedFlags = (item) => {
    const newArray = selectedFlags.filter((flag) => flag !== item)
    setSelectedFlags(newArray)
  }

  useEffect(() => {
    getFlags(setAllFlags)
  }, []);

  return (
    <Content topic={form.topic} content={form.content} quantityflags={selectedFlags.length}>
      <form onSubmit={handleClick}>
        <input placeholder='What do you want to post about?'
          required
          type="text"
          name="topic"
          value={form.topic}
          onChange={onChangeForm}
        />
        <textarea placeholder='Tell us more details...'
          required
          type="text"
          name="content"
          value={form.content}
          onChange={onChangeForm}
        />
        <div className='newPostFlags'>
          {allFlags.filter((item) => selectedFlags.includes(item.name)).map((item) => <Flag key={item.name} item={item} showx={true.toString()} onclickX={updateSelectedFlags} />)}
        </div>
        <div className='input-with-autosuggest'>
          <InputWithAutosuggest suggestions={allFlags} setSelectedFlags={setSelectedFlags} selectedFlags={selectedFlags} />
          <p>Select up to 3 topics related to this post</p>
        </div>
        <span>
          <Btn id="cancelBtn" onClick={() => props.closeModal()}>Cancel</Btn>
          <Btn id="postBtn" disabled={(form.topic.length === 0 || form.content.length === 0 || selectedFlags.length === 0) ? true : false}>Post</Btn>
        </span>
      </form>
    </Content>
  )
}