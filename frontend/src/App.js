import { useEffect, useState } from "react";
import { Router } from "./router/Router";
import { GlobalStyle } from "./GlobalStyle";
import { GlobalContext } from "./context/GlobalContext";
import axios from "axios";

export const BASE_URL = 'http://localhost:3003'

function App() {
  const [currentTheme, setCurrentTheme] = useState(false || JSON.parse(localStorage.getItem("theme")))
  const [allPosts, setAllPosts] = useState([])

  const getPosts = async (path, headers) => {
    try {
      const response = await axios.get(BASE_URL + path, headers)
      setAllPosts(response.data.sort((a,b)=> Date.parse(b.createdAt) - Date.parse(a.createdAt)))
    } catch (error) {
      console.log(error.response.data)
      setAllPosts(null)
    }
  }

  useEffect(()=>{
    localStorage.setItem("theme", currentTheme)
  },[currentTheme])

  const context = {
    currentTheme,
    setCurrentTheme,
    getPosts,
    allPosts
    // mobileBreakPoint,
  }
  return (
    <GlobalContext.Provider value={context}>
      <GlobalStyle theme={currentTheme}/>
      <Router/>
    </GlobalContext.Provider>
  );
}

export default App;
