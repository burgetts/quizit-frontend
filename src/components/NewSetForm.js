import React, { useState, useContext } from 'react';
import '../css/NewSetForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useFields } from '../utils/hooks';
import UserContext from '../utils/UserContext';


const NewSetForm = () => {
    const { request, setCurrentUser, currentUser } = useContext(UserContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const INITIAL_STATE = {
        name: '',
        description: '',
        hidden: false,
        sideOneName: 'Term',
        sideTwoName: 'Definition',
    }

    const [formData, handleChange] = useFields(INITIAL_STATE)
    const handleSubmit = async (e) => {
        formData.hidden = formData.hidden === 'true'
        e.preventDefault()
        try {
            
            if (id){
                await request(`groups/${id}/sets`, formData, "post")
                const user = await request(`users/${currentUser.username}`)
                setCurrentUser(user.user)
                navigate(`/groups/${id}`)
            } else {
                await request(`sets`, formData, 'post')
                const user = await request(`users/${currentUser.username}`)
                setCurrentUser(user.user)
                navigate('/flashcards')
            }
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="NewSetForm-container">
                <h1 className="NewSetForm-h1"> Create a Set </h1>
          
                <form className="NewSetForm-form" onSubmit={handleSubmit}>
                    <label className="NewSetForm-label">Set Name</label>
                    <input className="NewSetForm-input" type="text" name="name" value={formData.name} onChange={handleChange} />

                    <label className="NewSetForm-label">Description</label>
                    <input className="NewSetForm-input" type="text" name="description" value={formData.description} onChange={handleChange} />

                    {id ?
                            '' 
                        : 
                            <>
                                <label className="NewSetForm-radio-label">Public</label>
                                <input className="NewSetForm-radio" type="radio" name="hidden" value={false} onChange={handleChange} />

                                <label className="NewSetForm-radio-label">Private</label>
                                <input className="NewSetForm-radio" type="radio" name="hidden" value={true} onChange={handleChange} /> <br/>
                            </>
                        }   

                    <label className="NewSetForm-label">Side One Name</label>
                    <input className="NewSetForm-input" type="text" name="sideOneName" value={formData.sideOneName} onChange={handleChange} />

                    <label className="NewSetForm-label">Side Two Name</label>
                    <input className="NewSetForm-input" type="text" name="sideTwoName" value={formData.sideTwoName} onChange={handleChange} />

                    <button className="NewSetForm-button" type="submit">Create Set</button>
                </form>
            </div>
        </>
    )
}

export default NewSetForm;