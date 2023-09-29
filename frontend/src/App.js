import { useEffect, useState } from "react";
import { Router } from "./router/Router";
import { GlobalStyle } from "./GlobalStyle";
import { GlobalContext } from "./context/GlobalContext";

export const BASE_URL = 'http://localhost:3003'

function App() {
  const [currentTheme, setCurrentTheme] = useState(false || JSON.parse(localStorage.getItem("theme")))
  
  useEffect(()=>{
    localStorage.setItem("theme", currentTheme)
  },[currentTheme])

  const context = {
    currentTheme,
    setCurrentTheme,
    // BASE_URL,
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
