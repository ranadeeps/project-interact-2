import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AccountCircle } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Chip, Divider, Input, ListItem } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function Post(params) {

    let content = params.data.content;
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [comments,setComments] = React.useState(params.data.comments);
    const [count,setCount] = React.useState(0);
    const [liveComment,setLiveComment] = React.useState("");
    const [list,setList] = React.useState();
    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
      setScroll(scrollType);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    React.useEffect(()=>{
      let arr=[];
      for (let index = 0; index < comments.length; index++) {
        arr.push(    
            <ListItem alignItems="flex-start" key={index}>
              <ListItemAvatar>
                <Avatar alt={comments[index].name} />
              </ListItemAvatar>
              <ListItemText
                primary={comments[index].name}
                secondary={
                  <React.Fragment>
                    {comments[index].comment}
                  </React.Fragment>
                }
              />
            </ListItem>
        )
        setList(arr)
      }
    },[count])

    const saveComments = ()=>{
        fetch("/addcomment/"+params.data._id,{
            method:'PUT',
            mode:'cors',
            headers:{
              'Content-Type':"application/json"
            },
            body:JSON.stringify({
                "name":params.username,
                "comment":liveComment
            })
        })
        .then((res)=>{
          res.json()
        })
        .then((res)=>{
          comments.push({"name":params.username,"comment":liveComment})
          setLiveComment("")
          setCount(count+1);
        })
    }

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

    return (
    <Card sx={{ minWidth: '20%',maxWidth:'20%',minHeight:250,maxHeight:250,m:2,p:2 }}>
      <CardContent sx={{minHeight:'70%',maxHeight:'70%'}}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end',mb:2}}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0,fontSize:"4rem" }} />
          <Typography variant="h6" component="div">
            {params.data.name}
          </Typography>
        </Box>
        

        <Divider></Divider>
        <Typography variant="body2" align='justify' paragraph sx={{mt:1}} fontSize={'1rem'}>
            {content.substring(0,100)}<p hidden={content.length<100}>...</p>
        </Typography>
      </CardContent>
      <CardActions >
        <Button  size="large" variant='contained' onClick={handleClickOpen('paper')}>Learn More</Button>
      </CardActions>
      <React.Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description" fullScreen
        >
          <DialogTitle id="scroll-dialog-title">{params.data.name}</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
            >
              <Typography variant="body2" align='justify' paragraph sx={{mt:2,fontWeight:'bold',fontSize:'1rem'}}>
                {content}
              </Typography>
              <Divider>
                <Chip variant='filled' size='medium' label="Comments" sx={{fontSize:'2rem'}} color='primary'></Chip>
              </Divider>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {list}
              </List>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{height:'15%'}}>
            <Input multiline aria-label='comment' placeholder='Enter your comment' sx={{width:'80%',height:'50%',mr:'8%'}} value={liveComment} onChange={(e)=>setLiveComment(e.target.value)} ></Input>
            <Button size='large' variant='contained' onClick={saveComments}>Save</Button>
            <Button size='large' variant='contained' onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        </React.Fragment>
    </Card>
  );
}