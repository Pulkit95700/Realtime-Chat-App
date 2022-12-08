import React from 'react';
import "./Login.css";
import Button from '@mui/material/Button';
import WhatsAppImg from "../../assets/whatsapp.png";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { setUser } from '../../store/auth/userActions';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signIn = async () => {
        try{
            const response = await signInWithPopup(auth, provider);
            dispatch(setUser({userName: response.user.displayName, userPhotoUrl: response.user.photoURL}));
            navigate("/");
        }catch(err){
            alert(err.message);
        }
    }
    return (
        <div className='login'>
            <div className='login__container'>
                <img src={WhatsAppImg} alt='My logo'/>
                <div className='login__text'>
                    <h1>Sign In to Whatsapp</h1>
                </div>
                <Button variant = "contained" type='submit' onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login