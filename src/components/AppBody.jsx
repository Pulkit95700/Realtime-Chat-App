import React from 'react';
import "./AppBody.css";
import SideBar from './SideBar/SideBar';
import ChatContainer from './ChatContainer/ChatContainer';
import {Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from './Login/Login';

function AppBody() {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    return (
        <div className='app'>
            {!isAuthenticated && <Login/>}
            {isAuthenticated && <div className='app__body'>
                <Routes>
                    <Route path='/' element={<><SideBar/></>} />
                    <Route path='/rooms/:roomId' element={<><SideBar/><ChatContainer /></>} /> 
                </Routes>
                {/*
            <SideBar/>
                <SideBarNav>
                <SearchBar>
                <ChatRooms>
            <ChatContainer>
                <SideChatNav>
                <ChatWindowForm>
            */}
            </div>
            }
        </div>
    );
}

export default AppBody