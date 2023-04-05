import React, { useState, useContext } from 'react';
import UserContext from '../utils/UserContext';
import '../css/SplitFlashcard.css';
import { useFields } from '../utils/hooks';

const SplitFlashcard = ({flashcard, sideOneName, sideTwoName, setFlashcards, flashcards, owner}) => {
    const { request  } = useContext(UserContext)
    const [editMode, setEditMode] = useState(false)
    const INITIAL_STATE = {
        sideOneImageUrl: flashcard.sideOneImageUrl,
        sideOneText: flashcard.sideOneText,
        sideTwoText: flashcard.sideTwoText
    }
    const [formData, handleChange] = useFields(INITIAL_STATE)

    const toggleEditMode = () => {
        editMode ? setEditMode(false) : setEditMode(true)
    }

    // edit flashcard
    const handleEdit = async (id) => {
        // make request to update flashcard
        try {
            const resp = await request(`flashcards/${flashcard.id}`, formData, 'patch')
            const newFlashcards = flashcards.filter(f => f.id !== flashcard.id)
            flashcard = resp.flashcard
            setFlashcards([...newFlashcards, resp.flashcard])
            toggleEditMode()
        } catch(e) {
            console.log(e)
        }
    }

    
    const deleteFlashcard = async (id) => {
        await request(`flashcards/${flashcard.id}`, {}, 'delete')
        const removeFlashcard = flashcards.filter(f => f.id !== id)
        setFlashcards(removeFlashcard)
    }


    return (
        <>
        { !editMode ? 
        <div className="SplitFlashcard">
            <div className="SplitFlashcard-side-one">
                <h6 className="SplitFlashcard-side-name">{sideOneName}</h6>
                {flashcard.sideOneImageUrl ? <img className="SplitFlashcard-image" src={flashcard.sideOneImageUrl}></img> : ''}
                {flashcard.sideOneText !== '' ?
                <span className="SplitFlashcard-text">{flashcard.sideOneText}</span>
                : ''}
            </div>

            <div className="SplitFlashcard-side-two">
                <h6 className="SplitFlashcard-side-name">{sideTwoName}</h6>
                {flashcard.sideTwoText !== '' ?
                <span className="SplitFlashcard-text">{flashcard.sideTwoText}</span>
                : ''}
                {owner ?
                <div className="SplitFlashcard-flashcard-buttons">
                    <button onClick={toggleEditMode}>Edit</button>
                    <button className="delete-button" onClick={() => deleteFlashcard(flashcard.id)}>Delete</button>
                </div>
                : '' }
            </div>
        </div>
        :
        <div className="SplitFlashcard">
            <div className="SplitFlashcard-side-one">
                <h6 className="SplitFlashcard-side-name">{sideOneName}</h6>

                <label className="SplitFlashcardEdit-label">Side One Image URL (optional)</label>
                <input className="SplitFlashcardEdit-input" type="text" name="sideOneImageUrl" value={formData.sideOneImageUrl} onChange={handleChange}></input>

                <label className="SplitFlashcardEdit-label">Side One Text</label>
                <input className="SplitFlashcardEdit-input" type="text" name="sideOneText" value={formData.sideOneText} onChange={handleChange}></input>


            </div>
            <div className="SplitFlashcard-side-two">
                <h6 className="SplitFlashcard-side-name">{sideTwoName}</h6>

                <label className="SplitFlashcardEdit-label">Side Two Text</label>
                <input className="SplitFlashcardEdit-input" type="text" name="sideTwoText" value={formData.sideTwoText} onChange={handleChange}></input>

                <button className="SplitFlashcard-edit-buttons" onClick={handleEdit}> Save Changes</button>
                <button className="SplitFlashcard-edit-buttons" onClick={toggleEditMode}>Cancel</button>  

            </div>
        
        </div>
        }
        </>
    )
}

export default SplitFlashcard