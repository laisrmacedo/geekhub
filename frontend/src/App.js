import { useState } from "react";
import { Router } from "./router/Router";
import { GlobalStyle } from "./GlobalStyle";
import { GlobalContext } from "./context/GlobalContext";

function App() {
  const [allPosts, setAllPosts] = useState([])

  const context = {
    allPosts,
    setAllPosts
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
