import { useState } from "react";
import { Router } from "./router/Router";
import { GlobalStyle } from "./GlobalStyle";
import { GlobalContext } from "./context/GlobalContext";

function App() {
  const [allPosts, setAllPosts] = useState([])
  const [clickedFlag, setClikedFlag] = useState(null)

  const context = {
    allPosts,
    setAllPosts,
    clickedFlag,
    setClikedFlag
    // mobileBreakPoint,
  }
  return (
    <GlobalContext.Provider value={context}>
      <GlobalStyle/>
      <Router/>
    </GlobalContext.Provider>
  );
}

export default App;
