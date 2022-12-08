import React, {useState, useEffect, useRef, useCallback} from 'react';
import "./ChatContainer.css";
import Avatar from '@mui/material/Avatar';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import ChatMessage from './ChatMessage';
import {IconButton} from "@mui/material"
import {useParams} from "react-router-dom";
import {query, onSnapshot, collection, doc, orderBy, addDoc, serverTimestamp} from "firebase/firestore";
import db from '../../firebase';
import {useSelector} from "react-redux";

const ChatContainer = () => {

    const [seed, setSeed] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const {roomId} = useParams();
    const [chatHeaderData, setChatHeaderData] = useState({name: 'ChatName'});
    const [messages, setMessages] = useState([]);
    const userName = useSelector((state) => state.user.userName);
    const containerRef = useRef();

    const getHeaderData = useCallback(async () => {
        const roomRef = doc(db, 'rooms', roomId);
        onSnapshot(roomRef, (snapshot) => {
            const name = snapshot.data().name;  
            setChatHeaderData((prev) => {return({...prev, name: name})}) 
        })

        const q = query(collection(roomRef, 'messages'), orderBy('timestamp', 'asc'))

        onSnapshot(q, (snapshot) => {
            const allMessages = snapshot.docs.map((doc => doc.data()));
            setMessages(allMessages);
            containerRef?.current?.lastChild?.scrollIntoView({behaviour: 'smooth'});
        })

    }, [roomId])

    const messageInputChangeHandler = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setMessageInput(value);
    }

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId])

    useEffect(() => {
        getHeaderData();
    }, [roomId])

    const sendMessageHandler = (event) => {
        event.preventDefault();
        const roomRef = doc(db, 'rooms', roomId);
        const messageRef = collection(roomRef, 'messages');
    
        const response = addDoc(messageRef, {
            name: userName,
            message: messageInput,
            timestamp: serverTimestamp(),
        })

        setMessageInput("");
    }

    return (
        <div className='chat-container'>
            <div className='chat-container__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat-container__header-chat'>
                    <h3>{chatHeaderData.name}</h3>
                    <p>last seen at { new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString() } </p>
                </div>
                <div className='chat-container__header-right'>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div  className='chat-container__chatBox' ref ={containerRef}>
                {messages.map((message) => {
                    return(<ChatMessage 
                        key={message.timestamp?.nanoseconds} 
                        isClient={message.name === userName ? true : false} 
                        message = {message.message} 
                        chatName = {message.name} 
                        time = {new Date(message.timestamp?.toDate()).toUTCString()} />)
                })}
            </div>
            <div className='chat-container__chatInput'>
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
 
                <form className='chat-container__chatInput-box' onSubmit={sendMessageHandler}>
                    <input value={messageInput} type="text" placeholder='Type a message' onChange={messageInputChangeHandler}/>
                    <button type='submit'>Send</button>
                </form>
                <IconButton>
                    <MicIcon/>
                </IconButton>
            </div>
        </div>
  )
}

export default ChatContainer