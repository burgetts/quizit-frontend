import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css';
import UserContext from '../utils/UserContext';
import { useFields } from '../utils/hooks';

const SignupForm = () => {
    const { setToken, request } = useContext(UserContext)
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])

    const INITIAL_STATE = {
        username: '',
        firstName: '',
        email: '',
        password: ''
    }

    const [formData, handleChange] = useFields(INITIAL_STATE)

    // register new user and store their token in localStorage
    async function signup(user) {
        const resp = await request(`auth/register`, user, "post")
        const token = resp.token
        if (!token) return
        setToken(token)
     }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signup(formData)   
        } catch (e) {
            setErrors(e.response.data.error.message)
            return
        }
        navigate('/')
    }

    return (
        <>
        <div className="Form-container">
        
            <h1 className="Form-h1">Sign Up</h1>
            <p className="Form-p"> Ready to level up your study game?</p>
            
            <form onSubmit={handleSubmit}>
                <label className="Form-label">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="Form-input"></input>

                <label className="Form-label">First name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="Form-input"></input>

                <label className="Form-label">Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} className="Form-input"></input>


                <label className="Form-label">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="Form-input"></input>
                {errors ? errors.map((e, idx) => <h6 className="Error-message" key={idx}>{e}</h6>) : ''}  
                <button className="Form-button">Sign up</button>
            </form>
        </div>
        
        </>
    )
}

export default SignupForm;