import React, { useContext, useState } from 'react';
import UserContext from '../utils/UserContext';
import { useFields } from '../utils/hooks';

const UserProfileForm = () => {
    let [message, setMessage] = useState(null)
    let [errors, setErrors] = useState(null)

    const { currentUser, request, setCurrentUser } = useContext(UserContext)
    const INITIAL_STATE = {
        firstName: currentUser.firstName,
        email: currentUser.email,
        profilePicture: currentUser.profilePicture
    }

    const [formData, handleChange] = useFields(INITIAL_STATE) 

   
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await request(`users/${currentUser.username}`, formData, 'patch')
            for (let k in formData){
                if (formData[k] === ''){
                    setErrors([`Please don't leave any fields blank.`])
                    return
                }
            }
            const user = (await request(`users/${currentUser.username}`)).user
            setCurrentUser(user)
            setErrors(null)
            setMessage('Your changes have been saved.')
        } catch(e){
            setErrors(e)
            return
        }
    }
    return (
        <div className="Form-container">
            <h1 className="Form-h1"> Your Profile </h1>
            {errors ? errors.map((e, idx) => <h6 className="Error-message" key={idx}>{e}</h6>) : ''}
            {message ? <h6 className="Success-message">{message}</h6> : ''}
            <form onSubmit={handleSubmit}>
                <img src={currentUser.profilePicture} alt="profile pic" className="Form-image" ></img>
                <label className="Form-label">Profile picture URL</label>
                <input  type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} className="Form-input"></input>

                <label className="Form-label">Username</label>
                <input className="Form-input disabled" type="text" name="username" value={currentUser.username} disabled={true}></input>

                <label className="Form-label">Preferred name</label>
                <input className="Form-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange}></input>

                <label className="Form-label">Email</label>
                <input className="Form-input" type="text"  name="email" value={formData.email} onChange={handleChange}></input>

                <button className="Form-button">Save Changes</button>
            </form>
        </div>
    )
}

export default UserProfileForm;