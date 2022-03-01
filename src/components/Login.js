import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'
import {getFavouritesFromServer, insertUserInfo, searchRecipesAction} from "../actions";
import {connect} from "react-redux";
const Login = ({insertUserInfo, title, getFavouritesFromServer}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    let navigate = useNavigate();

    useEffect(()=>{
        setMsg('')
    },[])

    const handleAction = async (id) => {
        console.log(id);
        if(id=='Register'){
            try{
                let response = await axios.post('http://localhost:5001/register',{
                    name,email,password
                },{
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                })
                console.log('register response', response);
                navigate('/login')
            }
            catch(e){
                console.log(e);
                setMsg(e.response.data.msg)
                toast.error(e.response.data.msg)
            }
        }
        else if(id=='Login'){
            try {
                let response = await axios.post('http://localhost:5001/login',{
                    email,password
                },{
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                })
                console.log('login response', response);

                let userInfoResponse = await axios.get('http://localhost:5001/user', {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                })
                console.log('userInfo response', userInfoResponse);
                insertUserInfo(userInfoResponse.data)
                getFavouritesFromServer()
                navigate('/home')
            } catch (e) {
                console.log(e);
                setMsg(e.response.data.msg)
                toast.error(e.response.data.msg)
            }
        }
    }

    return(
        <>
            <div className="container">
            <div>
                    <h3>{title} Form</h3>
                </div>
                <Box component='form'
                     sx={{m:1}}
                     noValidate
                     autoComplete='off'>
                    {
                        title=='Register' &&
                        <TextField
                            sx={{m:1}}
                            id='name'
                            label='Enter your full name'
                            variant='outlined'
                            onChange={(e)=>setName(e.target.value)}
                        />
                    }
                    <br/>
                    <TextField
                        sx={{m:1}}
                        id='email'
                        label='Enter the Email'
                        variant='outlined'
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <br/>
                    <TextField
                        sx={{m:1}}
                        id='password'
                        label='Enter the Password'
                        variant='outlined'
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <br/>
                </Box>
                <Button variant="contained"
                        onClick={()=>handleAction(title)}
                >{title}</Button>
                <div>{msg}</div>
                <div>{title=='Register'?<Link to='/login'>Login</Link>:<Link to='/register'>Register</Link>}</div>
            </div>
        </>
    )
}


const mapDispatchToProps = (dispatch) => {
    return{
        insertUserInfo: (userInfo) => dispatch(insertUserInfo(userInfo)),
        getFavouritesFromServer: () => dispatch(getFavouritesFromServer()),
    }
}

export default connect(null, mapDispatchToProps)(Login);
// export default Login;
