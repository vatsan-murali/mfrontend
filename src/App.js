import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import { createContext, useReducer } from "react";
import { initialState,reducer } from "../src/reducer/UseReducer";
import Main from "./components/Main";
import Logout from "./components/Logout";
import ImageComponent from "./components/ImageComponent";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <UserContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Body />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view" element={<ImageComponent />} />
        
      </Routes>
      <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
