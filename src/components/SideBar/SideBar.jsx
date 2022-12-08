import React from 'react';
import "./Sidebar.css";
import SideBarHeader from './SideBarHeader';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SideChat from './SideChat';
import db from "../../firebase";
import { useState, useEffect, useCallback } from 'react';
import {collection, onSnapshot, query} from "firebase/firestore";

const SideBar = () => {

    const [rooms, setRooms] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const getRooms = useCallback(async () => {
        const q = query(collection(db, 'rooms'));
        await onSnapshot(q, snapshot => {

            // console.log(snapshot.docs.map((doc) => {
            //     return({id: doc.id,
            //     data: doc.data(),})
            // }));
            setRooms(snapshot.docs.map((doc) => {
                return({id: doc.id,
                data: doc.data(),})
            }))
        })

    }, [])

    const searchInputChangeHandler = (event) => {
        setSearchInput(event.target.value);
    }
    useEffect(() => {
        getRooms();
    }, [])

    const data = searchInput === "" ? rooms.map((room) => {
        return (<SideChat name={room.data.name} key={room.id} id={room.id} />)
    }) : rooms.filter(room => room.data.name.toLowerCase().includes(searchInput.toLowerCase()))
        .map((room) => {
        return (<SideChat name={room.data.name} key={room.id} id={room.id} />)
    }) 

    return (
        <div className='sidebar'>
            <SideBarHeader/>
            <div className='sidebar__search'>
                <div className="sidebar__searchContainer">
                    <SearchOutlined style={{fontSize: '16px', color: 'grey'}}/>
                    <input value={searchInput} onChange={searchInputChangeHandler} type="text" placeholder='Search or start new chat'/>
                </div>
            </div>
            <div className='sidebar__chatrooms'>
                <SideChat addNewChat = {true}/>
                {data}
            </div>
        </div>
    )
}

export default SideBar