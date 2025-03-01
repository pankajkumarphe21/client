import { Button, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { RootState } from "../app/store";

const Home = () => {
    const navigate=useNavigate();
    const user=useSelector((state:RootState)=>state.user.user);
  return (
    <div>
        <Button variant="contained" onClick={()=>{navigate('/login')}}>Login Page</Button>
        <Typography>{user}</Typography>
    </div>
  )
}

export default Home