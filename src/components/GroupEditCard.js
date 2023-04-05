import React from 'react';
import { useFields } from '../utils/hooks';
import '../css/GroupEditCard.css'


const GroupEditCard = ({group, setEditMode, editGroup}) => {
    const INITIAL_STATE = {
        groupPicture: group.groupPicture,
        name: group.name,
        description: group.description
    }
    const [formData, handleChange] = useFields(INITIAL_STATE)

    const handleSubmit = (e) => {
        e.preventDefault()
        editGroup(formData)
    }

    return (
    <form className="GroupEditCard">
        <label className="GroupEditCard-label">Group Picture</label> 
        <input className="GroupEditCard-input" type="text" onChange={handleChange} value={formData.groupPicture} name="groupPicture"></input>

        <label className="GroupEditCard-label">Name</label>
        <input className="GroupEditCard-input" type="text" onChange={handleChange} value={formData.name} name="name"></input>

        <label className="GroupEditCard-label">Description</label> 
        <input className="GroupEditCard-input" type="text" onChange={handleChange} value={formData.description} name="description"></input>

        <div className="GroupEditCard-buttons">
            <button className="GroupEditCard-cancel-button" onClick={() => setEditMode(false)}>Cancel</button> 
            <button className="GroupEditCard-save-changes-button" onClick={handleSubmit}>Save Changes</button>
        </div> 
    </form>
    )
}

export default GroupEditCard;