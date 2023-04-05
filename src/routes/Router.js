import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignupForm from '../pages/SignupForm';
import LoginForm from '../pages/LoginForm';
import UserProfileForm from '../pages/UserProfileForm';
import Protected from './Protected';
import UserContext from '../utils/UserContext';
import FlashcardsPage from '../pages/FlashcardsPage';
import NewSetForm from '../components/NewSetForm';
import Set from '../components/Set';
import FlashcardPractice from '../components/FlashcardPractice';
import GroupsPage from '../pages/GroupsPage';
import NewGroupForm from '../pages/NewGroupForm';
import Group from '../pages/Group';

const Router = () => {
    const { currentUser } = useContext(UserContext)
    return (
        <Routes>
            {/* NOT PROTECTED */}
            <Route path='/' element={<Home />}/>
            <Route path="/signup" element={<SignupForm />}/>
            <Route path="/login" element={<LoginForm />}/>

            {/* PROTECTED */}
            <Route path="/profile" element={
                <Protected currentUser={currentUser}>
                    <UserProfileForm />
                </Protected>}>
            </Route>

            <Route path="/flashcards" element={
                <Protected currentUser={currentUser}>
                    <FlashcardsPage />
                </Protected>}>
            </Route>

            <Route path="/flashcards/sets/new" element={
                <Protected currentUser={currentUser}>
                    <NewSetForm />
                </Protected>}>
            </Route> 

            <Route path="/groups/:id/sets/new" element={
                <Protected currentUser={currentUser}>
                    <NewSetForm />
                </Protected>}>
            </Route> 


            <Route path="/flashcards/sets/:id" element={
                <Protected currentUser={currentUser}>
                    <Set />
                </Protected>}>
            </Route> 

            <Route path="/groups/:groupId/flashcards/sets/:id" element={
                <Protected currentUser={currentUser}>
                    <Set />
                </Protected>}>
            </Route> 


            <Route path="/flashcards/sets/:id/practice" element={
                <Protected currentUser={currentUser}>
                    <FlashcardPractice />
                </Protected>}>
            </Route> 

            <Route path="/groups" element={
                <Protected currentUser={currentUser}>
                    <GroupsPage />
                </Protected>}>
            </Route>

            <Route path="/groups/new" element={
                <Protected currentUser={currentUser}>
                    <NewGroupForm />
                </Protected>}>
            </Route>

            <Route path="/groups/:id" element={
                <Protected currentUser={currentUser}>
                    <Group />
                </Protected>}>
            </Route>
        </Routes>
    )
}

export default Router;