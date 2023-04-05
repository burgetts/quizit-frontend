import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import "../css/Set.css";
import SplitFlashcard from './SplitFlashcard';
import SetEditCard from './SetEditCard';
import NewFlashcardForm from '../pages/NewFlashcardForm';

const Set =  () => {
    const { id, groupId } = useParams()
    const { request, currentUser, setCurrentUser } = useContext(UserContext)
    const [set, setSet] = useState(null)
    const [flashcards, setFlashcards] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [newFlashcards, setNewFlashcards]= useState([])
    const [owner, setOwner] = useState()

    const navigate = useNavigate()

    // get set data on load
    useEffect(() => {
        const getSet = async () => {
            const resp = await request(`sets/${id}`)
            setSet(resp.set)
            setFlashcards(resp.set.flashcards)
            setOwner(resp.set.createdBy === currentUser.username)
        }
        getSet()
        

    }, [editMode])
  
    const toggleEditMode = () => {
        editMode ? setEditMode(false) : setEditMode(true)
    }
   
    const deleteSet = async () => {
        await request(`sets/${id}`, {}, 'delete')
        const user = await request(`users/${currentUser.username}`)
        setCurrentUser(user.user)
        navigate(`/flashcards`)
    }


    return (
    <>
        {set ? 
            !editMode ? 
                <div>
                    <div className="Set">
                    <p className="Set-name">{set.name}</p>
                    <p className="Set-description">{set.description}</p>
                    {(set.createdBy === currentUser.username || groupId) ? 
                        <div className="Set-buttons">
                            <button onClick={() => toggleEditMode(editMode)}>Edit Set</button>
                            <button className="delete-button" onClick={deleteSet}>Delete Set</button>
                        </div>
                    : '' }
                    </div>
                </div>
            : 
                <SetEditCard set={set} toggleEditMode={toggleEditMode} />
        : 
            <h1 className="Set-h1"> Loading set... </h1> 
        }

        { flashcards.length > 0 ? 
            <div className="Flashcard-container">
                {flashcards.map(f => <SplitFlashcard key={f.id} flashcard={f} flashcards={flashcards} sideOneName={set.sideOneName} sideTwoName={set.sideTwoName} setFlashcards={setFlashcards} owner={owner}/>)}
            </div>
        :  
           <h2 className="Flashcards-h2"> <br/> <br/>No flashcards yet!</h2>
        }

        {flashcards.length > 0 ? 
            <button className="Set-buttons-practice"> 
                <Link to={`/flashcards/sets/${id}/practice`}> Practice </Link> 
            </button>
        :
        <button className="Set-buttons-practice" disabled={true}>Practice</button> }
        {set && (owner || groupId)  ? <button className="Set-buttons-add-flashcard" onClick={() => setNewFlashcards([...newFlashcards, 1])}>Add Flashcard</button> : ''}
        {newFlashcards.map((f) => <NewFlashcardForm sideOneName={set.sideOneName} sideTwoName={set.sideTwoName} setFlashcards={setFlashcards} setNewFlashcards={setNewFlashcards} newFlashcards={newFlashcards} setId={set.id} flashcards={flashcards}/>)
        }
    </>
    )
}

export default Set;