import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Container, Input } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Post from './Post';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60ch',
    },
  },
}));


export default function Postspage() {

  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const [count,setCount] = React.useState(0);
  const [data,setData] = React.useState([]);
  const [content,setContent] = React.useState("");
  const [filterData,setFilteredData] = React.useState([]);
  const [isProgress,setIsProgress] = React.useState(true);
  let navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(()=>{
    fetch("/getposts")
    .then((res)=>res.json())
    .then((data)=>{
      let dataElement = [];
      for (let index = 0; index < data.length; index++) {
        dataElement.push(<Post data={data[index]} key={index} username={location.state.data}></Post>)
      }
      setData(dataElement);
      setFilteredData(dataElement);
    })
    .catch((err)=>{
      console.log(err);
    });
  },[count]);

  const Save=()=>{
      fetch("/receive",{
        method:'POST',
        mode:'cors',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          "name":location.state.data,
          "content":content,
          "comments":[]})
      }).then((res)=>{
        console.log(res);
        setCount(count+1);
      });
      setOpen(false);
  }

  const search = (key)=>{
    setIsProgress(false);
    
    if(key!==''){
      const fData = data.filter((element)=>{
        let tempComments = element.props.data.comments.filter((el)=>{
          return el.comment.includes(key)||el.name.includes(key);
        });
        let bool=false;
        if(tempComments.length!==0){
          bool=true
        }
        return element.props.data.name.includes(key)||element.props.data.content.includes(key)||bool
      });
      setData(fData);
    }
    else{
      setData(filterData);
    }
    setIsProgress(true);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    
    
  };

  const logout = ()=>{
    navigate('/');
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem disabled>{location.state.data}</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
    
  return (

    <Container>

      <Box sx={{ flexGrow: 1,mb:2 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h3"
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Interact
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e)=>search(e.target.value)}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MenuItem onClick={handleClickOpen}>
                  <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Create Post
                  </Typography>
              </MenuItem>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle sx={{fontSize:'rem'}} />
                
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Dialog open={open} onClose={handleClose} sx={{backgroundColor:'GrayText'}}>
        <form>
          <DialogTitle>New Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your username will be recorded.
            </DialogContentText>
            <Input aria-label='Message' multiline placeholder='Enter your message' sx={{width:300}} value={content} onChange={(e)=>setContent(e.target.value)} ></Input>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={Save}>Save</Button>
          </DialogActions>
        </form>
          
        </Dialog>
      </Box>
      <Box sx={{ width: '100%' }} hidden={isProgress}>
        <LinearProgress />
      </Box>
      <Box sx={{ display:'flex', flexDirection:'row',flexWrap:'wrap',p:1,m:2,justifyContent:'center',backgroundColor:'burlywood'}}>
        <h1 hidden={data.length!==0||filterData.length!==0}>No Posts. Create new post</h1>
        <h1 hidden={data.length!==0||filterData.length===0}>No Results Found</h1>
        {data}
      </Box>
    </Container>
  );
}
