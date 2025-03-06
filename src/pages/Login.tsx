import {
  Button,
  Card,
  Divider,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import {updateUser} from '../features/user/User'
import { useDispatch } from "react-redux";
import axios from "../config/axios";

const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr]=useState(null);
  const dispatch=useDispatch();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('/auth/login',{email,password}).then((res)=>{
      dispatch(updateUser(res.data.user));
      navigate('/');
    }).catch((err)=>{
      setErr(err.response.data.message);
    });
  };
  const signInWithGoogle=async()=>{
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();
    await axios.post('/auth/login-firebase',{idToken}).then((res)=>{
      dispatch(updateUser(res.data.user));
      navigate('/');
    }).catch((err)=>{
      setErr(err.response.data.message);
    });
  }
  return (
    <form onSubmit={handleSubmit} style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>
      <Card style={{display:'flex',flexDirection:'column',paddingTop:'20px',width:'50%',height:"80vh",backgroundColor:'#d6e3e2',alignItems:'center',justifyContent:'center'}}>
        <FormControl sx={{ paddingBottom: "20px",width:'60%' }}>
          <InputLabel htmlFor="my-email">Email address</InputLabel>
          <Input
            id="my-email" type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </FormControl>
        <FormControl sx={{paddingBottom: "20px",width:'60%'}}>
          <InputLabel htmlFor="my-password">Password</InputLabel>
          <Input
            id="my-password" type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </FormControl>
        <div style={{height:'55px',color:'red',display:'flex',alignItems:'center',fontSize:'20px'}}>{err}</div>
        <Button type="submit" sx={{marginBottom: "20px"}} variant="contained">Login</Button>
        <Divider sx={{marginBottom: "20px"}}>OR</Divider>
        <Button onClick={()=>navigate('/register')} variant="contained" color="secondary" sx={{marginBottom: "20px"}}>Register</Button>
        <Divider sx={{marginBottom: "20px"}}>OR</Divider>
        <Button onClick={signInWithGoogle} variant="contained" sx={{backgroundColor:'orange'}}>Sign in with Google</Button>
      </Card>
    </form>
  );
};

export default Login;
