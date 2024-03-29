import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
     fetch("https://malaria-backend.onrender.com/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
//         credentials: "include",
      }).then((res) => {
       console.log(res)
        dispatch({type: "USER", payload:false})
       localStorage.removeItem("jwtoken");
       navigate('/')
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
      
      }).catch((e) => {
        console.log(e);
      })
  });
  return <div>Logout</div>;
};

export default Logout;
