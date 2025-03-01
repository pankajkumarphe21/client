import {
  Button,
  Card,
  Divider,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/user/User";

const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.get('/');
    dispatch(updateUser(email));
    navigate('/');
  };
  return (
    <form onSubmit={handleSubmit} style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>
      <Card style={{display:'flex',flexDirection:'column',paddingTop:'20px',width:'50%',height:"60vh",backgroundColor:'#d6e3e2',alignItems:'center',justifyContent:'center'}}>
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
        <Button type="submit" sx={{marginBottom: "20px"}} variant="contained">Login</Button>
        <Divider sx={{marginBottom: "20px"}}>OR</Divider>
        <Button onClick={()=>navigate('/register')} variant="contained" color="secondary">Register</Button>
      </Card>
    </form>
  );
};

export default Login;
