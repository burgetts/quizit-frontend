import React, { useState , useContext} from 'react';
import '../css/Form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import { useFields } from '../utils/hooks';



const LoginForm = () => {
    const navigate = useNavigate()
    const { setToken, request } = useContext(UserContext)
    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const [formData, handleChange] = useFields(INITIAL_STATE)
    const [error, setError] = useState(null)

    async function login({username, password}) {
        try {
            const resp = await request(`auth/token`, {username, password}, "post")
            const token = resp.token
            setToken(token)
        } catch (e){
         setError(e)
         return
        }
        navigate('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(formData)
    }

    return (
    
        <div className="Form-container">
            <h1 className="Form-h1">Log In</h1>
           
            <p className="Form-p">Let's get back into it!</p>
            <form onSubmit={handleSubmit}>
                <label className="Form-label">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="Form-input"></input>

                <label className="Form-label">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="Form-input"></input>
                {error ?  <h6 className="Error-message">{error}</h6>: ''}
                <button className="Form-button">Log in</button>
            </form>
        </div>
       
    )
}

export default LoginForm;