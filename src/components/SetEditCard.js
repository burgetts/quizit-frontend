import React, { useContext } from 'react';
import { useFields } from '../utils/hooks';
import '../css/SetEditCard.css';
import UserContext from '../utils/UserContext';


const SetEditCard = ({set, toggleEditMode}) => {
    const { request, setCurrentUser, currentUser } = useContext(UserContext)

    const INITIAL_STATE = {
        name: set.name,
        description: set.description,
        sideOneName: set.sideOneName,
        sideTwoName: set.sideTwoName,
        hidden: set.hidden
    }

    const [formData, handleChange] = useFields(INITIAL_STATE)

    const handleSubmit = async () => {
        try {
            await request(`sets/${set.id}`, formData, 'patch')
            const user = await request(`users/${currentUser.username}`)
            setCurrentUser(user.user)
            toggleEditMode()
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <div>
        <div className="SetEditCard">
       
            <label className="Set-edit-label">Name</label>
            <input className="Set-edit-input" type="text" name="name" value={formData.name} onChange={handleChange}></input>
         
            <label className="Set-edit-label">Description</label>
            <input className="Set-edit-input" type="text" name="description" value={formData.description} onChange={handleChange}></input>
       
            <label className="Set-edit-label">Side One Name</label>
            <input className="Set-edit-input" type="text" name="sideOneName" value={formData.sideOneName} onChange={handleChange}></input>
 
            <label className="Set-edit-label">Side Two Name</label>
            <input className="Set-edit-input" type="text" name="sideTwoName" value={formData.sideTwoName} onChange={handleChange}></input>

            <button onClick={toggleEditMode}>Cancel</button>
            <button className="SetEditCard-save-button" onClick={handleSubmit}>Save Changes</button>
  
        </div>
    </div>
    )
}

export default SetEditCard;