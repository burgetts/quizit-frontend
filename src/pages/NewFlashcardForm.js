import React, { useContext } from 'react';
import { useFields } from '../utils/hooks';
import UserContext from '../utils/UserContext';

const NewFlashcardForm = ({sideOneName, sideTwoName, setFlashcards, setNewFlashcards, newFlashcards, flashcards, setId }) => {

    const { request } = useContext(UserContext)
    const INITIAL_STATE = {
        sideOneImageUrl: '',
        sideOneText: '',
        sideTwoText: ''
    }

    const [formData, handleChange] = useFields(INITIAL_STATE)

    const addFlashcard = async () => {
        try {
            const resp = await request(`flashcards`, {...formData, setId: setId}, 'post')
            const newFlashcard = resp.flashcard
            console.log(flashcards)
            flashcards === [] ?  setFlashcards([newFlashcard]) : setFlashcards([...flashcards, newFlashcard])
            setNewFlashcards(Array(newFlashcards.length-1).fill().map((_, i) => i+1))
        } catch(e) {
            console.log(e)
        }
    }

    return (
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

            <button className="SplitFlashcard-edit-buttons" onClick={addFlashcard}> Add Flashcard </button>
            <button className="SplitFlashcard-edit-buttons" onClick={() => setNewFlashcards(Array(newFlashcards.length-1).fill().map((_, i) => i+1))}>Cancel</button>  

            </div>
        </div>
    )
}

export default NewFlashcardForm;