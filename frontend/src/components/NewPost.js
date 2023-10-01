import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Btn } from '../GlobalStyle'
import { InputWithAutosuggest } from './InputWithAutosuggest'
import { BASE_URL } from '../App'
import { Flag } from './DiscussionCard'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  border-radius: 10px;
  padding: 24px;
  background-color: #F0F0F0;

  h2{
    color: #000;
    font-size: 14px;
  }

  form{
    /* border: 1px red solid; */
    width:100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    p{
      font-size: 12px;
    }
    
    input, textarea{
      min-width:100%;
      /* margin-top: 8px; */
      height: 100%;
      max-height: 30px;
      padding: 8px 11px;
      border: none;
      border-radius: 4px;
      font-size: 11px;
      /* background-color: #f0f0f0; */
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
    .newPostFlags{
      display: flex;
      gap: 4px;
      height: 16px;
    }
  }
  #createBtn{
    align-self: flex-end;
    border: none;
    background: ${(props) => ((props.topic.length === 0 || props.content.length === 0)? `#cfdbff`: `#7695EC`)};
    cursor: ${(props) => ((props.topic.length === 0 || props.content.length === 0)? `auto`: `pointer`)};
  }

  #postBtn{
    border: none;
    color: #FFF;
    background: ;
    background: ${(props) => ((props.topic.length === 0 || props.content.length === 0)? `#4F709C4a`: `#4F709C`)};
    cursor: ${(props) => ((props.topic.length === 0 || props.content.length === 0)? `auto`: `pointer`)};
  }

  #cancelBtn{
    /* border: 1px solid #999999; */
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

  // const [flagName, setFlagName] = useState("")
  const [allFlags, setAllFlags] = useState([])
  const [selectedFlags, setSelectedFlags] = useState([])

  const headers = {
    headers: {
      authorization: localStorage.getItem("token")
    }
  }

  // const onChangeFlagName = (e) => {
  //   setFlagName(e.target.value)
  // }

  const handleClick = (e) => {
    e.preventDefault()

    if(e.nativeEvent.submitter.id === 'postBtn'){
      createOrEditPost('post')
    }else{
      createOrEditPost('patch')
      // dispatch(closeModal())
    }
  }

  const onChangeForm = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // const {currentUser, clckedPostId} = useSelector((rootReducer) => rootReducer.reducer)

  const createOrEditPost = async (req) => {
    try {
      if(req === 'post'){
        await axios.post(BASE_URL + '/posts', {
          topic: form.topic,
          content: form.content,
          flags: selectedFlags
        }, headers)
      }else{
        // await axios.patch(BASE_URL + clckedPostId + '/', {
        //   topic: form.topic,
        //   content: form.content
        // })
      }
      setForm({
        topic: "",
        content: ""
      })
      setSelectedFlags([])
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const getFlags = async () => {
    try {
      const response = await axios.get(BASE_URL + `/flags`, headers)
      console.log(response.data)
      // setContent("")
      setAllFlags(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }


  useEffect(() => {
    getFlags()
    console.log(selectedFlags.length)
  }, []);

  return (
    <Content topic={form.topic} content={form.content}>
      {/* <h2>What’s on your mind?</h2> */}
      <form onSubmit={handleClick}>
        {/* <div> */}
          {/* <p>topic</p> */}
          <input placeholder='What do you want to post about?'
            required
            type="text"
            name="topic"
            value={form.topic}
            onChange={onChangeForm}
          />
        {/* </div> */}
        {/* <div> */}
          {/* <p>Content</p> */}
          <textarea placeholder='Tell us more details...' 
            required
            type="text"
            name="content"
            value={form.content}
            onChange={onChangeForm}
          />
        {/* </div> */}
        <div className='newPostFlags'>
          {allFlags.filter((item)=>selectedFlags.includes(item.flag)).map((item)=> <Flag key={item.id} color={item.color}>{item.flag}</Flag>)}
        </div>
        <InputWithAutosuggest suggestions={allFlags} setSelectedFlags={setSelectedFlags} selectedFlags={selectedFlags}/>
        {props.component === 'toCreate'? 
          <button id="createBtn" disabled={(form.topic.length === 0 || form.content.length === 0)? true : false}>Create</button>
          :
          <span>
          <Btn id="cancelBtn" >Cancel</Btn>
          <Btn id="postBtn" disabled={(form.topic.length === 0 || form.content.length === 0 || selectedFlags.length === 0)? true : false}>Post</Btn>
        </span>
        }
      </form>
    </Content>
  )
}