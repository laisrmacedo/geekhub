import axios from "axios";
import { createContext } from "react";

export const GlobalContext = createContext()
// export const BASE_URL = 'http://localhost:3003'
export const BASE_URL = 'https://geekhub-gxst.onrender.com'

export const headers = {
  headers: {
    authorization: localStorage.getItem("token")
  }
}

export const getFlags = async (set) => {
  try {
    const response = await axios.get(BASE_URL + `/flags`, headers)
    set(response.data)
  } catch (error) {
    console.log(error.response.data)
  }
}

export const getPosts = async (path, headers, set) => {
  try {
    const response = await axios.get(BASE_URL + path, headers)
    set(response.data.sort((a,b)=> Date.parse(b.createdAt) - Date.parse(a.createdAt)))
  } catch (error) {
    console.log(error.response.data)
    set(null)
  }
}

export const getUser = async (nickname, headers, set) => {
  try {
    const response = await axios.get(BASE_URL + `/users?q=${nickname}`, headers)
    set(response.data[0])
  } catch (error) {
    console.log(error.response.data)
  }
}