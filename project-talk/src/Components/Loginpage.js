import '../Styles/loginpage.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useState } from 'react';
function Loginpage(params) {
    const [name,setName]=useState("");
    let navigate=useNavigate();
    let handleSubmit = (event)=>{
        console.log("here");
        navigate('/posts',{state:{data:name}});
        event.preventDefault();
    }
    return(
        <Container sx={{height:"100vh",backgroundColor:'burlywood'}} >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3" component="div">
                    Interact
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit}>
                <Container sx={{mt:12}}>
                    <Box sx={{ m: 1,margin:"auto",width:300 } }>
                        <Typography variant="h4" component="div" sx={{textAlign:'center',mb:2}}>
                        Enter Details
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end',mb:2}}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5,fontSize:"4rem" }} />
                            <TextField id="input-with-sx" sx={{mb:2, width:200 }} label="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}} size='medium' variant="standard" required={true}  />
                        </Box>
                        <div style={{width:"150px", margin:'auto'}}>
                            <Button sx={{width:150}} type='submit'variant="contained">Continue</Button>
                        </div>
                        
                    </Box>
                </Container>
                
            </form>
            
        </Container>
    )
}
export default Loginpage