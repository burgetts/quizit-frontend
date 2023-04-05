import './css/App.css';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import React, { useState, useEffect} from 'react';
import Router from "./routes/Router";
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useLocalStorage } from './utils/hooks';
import UserContext from './utils/UserContext';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
console.log(BASE_URL)
function App() {
    const [token, setToken] = useLocalStorage('token', null)
    const [currentUser, setCurrentUser] = useState(null)
  
    // on token change, get user info and store in current user
    useEffect(() => {
      async function getUser() {
        try {
          if (!token) return
          const payload = jwt_decode(token)
          const username = payload.username
          const user = await request(`users/${username}`)
          setCurrentUser(user.user)
        } catch { 
          return
        }
      }
      if (token) getUser()
    }, [token])
  
    async function request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        console.debug(data)
        console.log(BASE_URL)
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${token}` } 
        const params = (method === "get")
            ? data
            : {};
    
        try {
          const resp = (await axios({ url, method, data, params, headers }));

          const x = resp.data
          return x

        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message
          throw Array.isArray(message) ? message : [message];
        }
      }

  return (
    <div className="App">
        <BrowserRouter>
            <UserContext.Provider value={{currentUser, setCurrentUser, token, request, setToken}}>
                <Navbar />
                <Router />
            </UserContext.Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
