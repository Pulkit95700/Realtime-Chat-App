import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import {onSnapshot, query, collection, addDoc, doc, orderBy} from "firebase/firestore";
import db from '../../firebase';
import {NavLink} from "react-router-dom";


import "./SideChat.css";

const SideChat = (props) => {

    const [seed, setSeed] = useState("");
    // let lastMessage = "lastMessage";
    const [lastMessage, setLastMessage] = useState("last Message");

    const id = props.id;
    let addNewChat = props.addNewChat;

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [])

    
    useEffect(() => {
        const roomRef = doc(db, 'rooms', `${id}`);

        const q = query(collection(roomRef, 'messages'), orderBy('timestamp', 'desc'))

        // onSnapshot(q, (snapshot) => {
        //     // setLastMessage(snapshot.docs.map((doc) => doc.data())[0].message);
        //     console.log(snapshot);
        // })

        // const q = query(collection(doc(db, 'room/s', props.id), 'messages'), orderBy('timestamp', 'desc'))

        onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map((doc) => doc.data());
            if(messages.length !== 0){
                setLastMessage(messages[0].message)
            }
        })
    }, [id])

    const createChat = async (event) => {
        event.preventDefault();
        const chatName = prompt("Write the chat Name");

        if(chatName){

            try{
                const response = await addDoc(collection(db, 'rooms'), {
                    name: chatName, 
                })

                console.log(response);
                
            }catch(err){
                alert(err);
            }
        }
    }

    return (
        <>
        { !addNewChat ? (<NavLink to={`/rooms/${props.id}`} style={{textDecoration: "none", color: "black"}} className={({isActive}) => isActive ? 'sidebar__chat active' : 'sidebar__chat'}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className='sidebar__chatName'>
                <h3>{props.name}</h3>
                <p>{lastMessage.substring(0,30)}...</p>
            </div>
        </NavLink>) : <div className='sidebar__chat' onClick = {createChat}>
            <div className='sidebar__chatName'>
                <h3>Add New Chat</h3>
            </div>
        </div> }
        </>
  )
}

export default SideChat