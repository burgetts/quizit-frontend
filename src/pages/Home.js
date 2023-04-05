import "../css/Home.css";
import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../utils/UserContext';



const Home = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    return ( 
       
        <div className="Home">
            {!currentUser ?
            <div className="Home-container">
                <h1> Welcome to QuizIt! </h1>
                <p className="Home-p1"> Study flashcards by yourself or with friends, we don't judge. </p>
                <p> --------------------------------------------------------------------------- </p>
                <button className="Home-button" onClick={() => navigate("/login")}> Log In </button>
                <button className="Home-button" onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
            :
            <div className="Home-container">
                <h1>Welcome back, {currentUser.firstName}!</h1>
                <img className="Home-profile-picture" src={currentUser.profilePicture}></img>
                <p> Member since: {currentUser.accountCreated}</p>
                <button className="Home-button" onClick={() => navigate("/flashcards")}> Start studying </button>
                <button className="Home-button" onClick={() => navigate("/groups")}> Go to groups</button>
            </div>}
        </div>
    )
}

export default Home;