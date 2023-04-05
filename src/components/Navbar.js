import React, { useContext } from 'react';
import '../css/Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';

const Navbar = () => {
    const { currentUser, setToken, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()

    // clear user from state and token in localStorage
    function logout() {
        setCurrentUser(null)
        setToken(null)
        navigate('/login')
    }

    return (
        
        <ul className="navbar">
            <li className="logo">
                <NavLink to="/">QuizIt</NavLink>
            </li>
            <li className="nav left">
                <NavLink to="/">Home</NavLink>
            </li>
            {/* NOT LOGGED IN */}
            {!currentUser ?
            <>
                <li className="nav secondary">
                    <NavLink to="/signup">Sign up</NavLink>
                </li>
                <li className="nav">
                    <NavLink to="/login">Log in</NavLink>
                </li> 
            </>
            :
            <>
                {/* LEFT */}
                <li className="nav left">
                    <NavLink to="/flashcards">Flashcards</NavLink>
                </li>
                <li className="nav left">
                    <NavLink to="/groups">Groups</NavLink>
                </li>
                {/* RIGHT */}
                 <li className="nav">
                    <button onClick={logout}>Logout</button>
                </li> 
                <li className="nav">
                   <NavLink to="/profile"> {currentUser.username} </NavLink>
                </li> 
            </>}
        </ul>
    )
}

export default Navbar;