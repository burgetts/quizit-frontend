import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFields } from '../utils/hooks';
import UserContext from '../utils/UserContext';
import '../css/NewGroupForm.css';

const NewGroupForm = () => {
    const { request, setCurrentUser, currentUser } = useContext(UserContext)
    const navigate = useNavigate()

    const INITIAL_STATE = {
        name: '',
        description: '',
        groupPicture: 'https://geodash.gov.bd/uploaded/people_group/default_group.png'
    }
   

    const [formData, handleChange] = useFields(INITIAL_STATE)
    const handleSubmit = async (e) => {
       
        e.preventDefault()
        try {
            await request(`groups`, formData, 'post')
            const user = await request(`users/${currentUser.username}`)
            setCurrentUser(user.user)
            // update currentUser?
            navigate('/groups')
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="NewGroupForm-container">
                <h1 className="NewGroupForm-h1">Create a Group</h1>
            
                <form className="NewGroupForm-form" onSubmit={handleSubmit}>
                    <label className="NewGroupForm-label">Group Name</label>
                    <input className="NewGroupForm-input" type="text" name="name" value={formData.name} onChange={handleChange} />

                    <label className="NewGroupForm-label">Description</label>
                    <input className="NewGroupForm-input" type="text" name="description" value={formData.description} onChange={handleChange} />

                    <label className="NewGroupForm-label">Group Picture</label>
                    <input className="NewGroupForm-input" type="text" name="groupPicture" value={formData.groupPicture} onChange={handleChange} />

                    <button className="NewGroupForm-button">Create Group</button>
                </form>
            </div>
        </>

    )
}

export default NewGroupForm;