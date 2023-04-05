import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import '../css/Flashcard.css';
import ReactCardFlip from "react-card-flip";

function FlashcardPractice() {
	const [flip, setFlip] = useState(false);
    const { id } = useParams()
    const { request } = useContext(UserContext)
    const [set, setSet] = useState()
    const [flashcards, setFlashcards] = useState([])
    const [currentFlashcard, setCurrentFlashcard] = useState(null)
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)

    // get set and flashcards on load
    useEffect(() => {
        const getSet = async () => {
            const resp = await request(`sets/${id}`)
            setSet(resp.set)  
            setFlashcards(resp.set.flashcards)
            if (resp.set.flashcards.length > 0) setCurrentFlashcard(resp.set.flashcards[0])
        }
        getSet()
    }, [])

    // proceed to next card
    const nextCard = () => {
        setCurrentFlashcard(flashcards[currentFlashcardIndex+1])
        setCurrentFlashcardIndex(currentFlashcardIndex+1)
    }

    // return to previous card
    const previousCard = () => {
        setCurrentFlashcard(flashcards[currentFlashcardIndex-1])
        setCurrentFlashcardIndex(currentFlashcardIndex-1)
    }

    // shuffle and start deck over
    const shuffle = () => {
        const shuffle = (arr) => {
            for (var i = arr.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            return arr
        }
        setFlashcards(shuffle(flashcards))
        setCurrentFlashcardIndex(0)
        setCurrentFlashcard(flashcards[0])
    }

    // start deck over, keeping current order
    const startOver = () => {
        setCurrentFlashcardIndex(0)
        setCurrentFlashcard(flashcards[0])
    }

	return (
        <>
            {set && flashcards && currentFlashcard ?
            <div>
                <h1 className="Flashcard-h1">{set.name}</h1>
                <h2 className="Flashcard-h2">{set.description}</h2>
                <h3 className="Flashcard-h3">{currentFlashcardIndex+1}/{flashcards.length}</h3>
                
                <div className="Flashcard-top-buttons">
                    <button className="Flashcard-return-button"><Link to={`/flashcards/sets/${id}`}>Return to set</Link></button>
                    <button className="Flashcard-shuffle-button" onClick={shuffle}>Shuffle</button>
                    <button className="Flashcard-start-over-button" onClick={startOver}>Start Over</button>
                </div>
		        <ReactCardFlip isFlipped={flip} flipDirection="vertical">
			            <div className="sideOne" onClick={() => setFlip(!flip)}>
				            {currentFlashcard.sideOneImageUrl ? <img src={currentFlashcard.sideOneImageUrl} alt="flashcard side one"></img> : ''}
                            <p>{currentFlashcard.sideOneText}</p>
			            </div>

			            <div className="sideTwo" onClick={() => setFlip(!flip)}>
				            <p>{currentFlashcard.sideTwoText}</p>
			            </div>
		        </ReactCardFlip>
               
                <div className="Flashcard-navigate-buttons">
                    {currentFlashcardIndex === 0 ? '' : <button onClick={previousCard}>&lt;</button>}
                    {currentFlashcardIndex === flashcards.length-1 ? '' : <button onClick={nextCard}>&gt;</button> }
                </div>
                <p className="Flashcard-p">Click anywhere on the flashcard to see the other side.</p>
            </div>
            : <h1 className="Flashcard-h1">Loading set...</h1>}   
        </>
	);
}

export default FlashcardPractice;