import React from 'react';
import "./SideBarHeader.css";
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import {useSelector} from "react-redux";
import { useEffect } from 'react';
// import Avatar from "@mui/icons-material/"

const SideBarHeader = () => {
    const userPhotoUrl = useSelector((state) => state.user.userPhotoUrl);

    useEffect(() => {}, [userPhotoUrl]);

    return (
        <div className='sidebar__header'>
            <Avatar src = {userPhotoUrl ? userPhotoUrl : ""} />
            {/* <img src='https://toppng.com/uploads/preview/emoji-love-cute-png-11536086724kxa4whptmu.png' className='header-img'/> */}
            <ul className='header__features'>
                <li className='features__icon'>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                </li>
                <li className='features__icon'>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                </li>
                <li className='features__icon'>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </li>
            </ul>
        </div>
    )
    }

export default SideBarHeader