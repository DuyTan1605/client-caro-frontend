import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DefaultLayout from "../layout/defaultLayout"
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import Alert from '@material-ui/lab/Alert';
import ChangePassword from "./changePassword";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin:"5%"
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  uploadWrapper: {
    position: "relative",
    overflow: "hidden",
    display: "inline-block"
  },
  
  btn: {
    color: "white",
    backgroundColor: "#3f51b5",
    padding: "5px",
    borderRadius: "5px",
    fontSize: "15px",
    marginTop:'3px'
  },
  
  uploadBtnWrapperFile: {
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0
  }
}));

export default function Infor(props) {
  const classes = useStyles();
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = React.useState(false);
  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPassword("");
    setOldPassword("");
  };

  const handleChangeOldPassword = (value)=>{
    setOldPassword(value)
  }

  const handleChangeNewPassword = (value)=>{
    setNewPassword(value)
  }

  const changePassword = (e)=>{
    e.preventDefault();
    console.log(oldPassword,newPassword);
  }
 // const [message,setMessage] = useState("");
  const {actions} = props;
  const {message} = props;
  
  if (!info ) {
    window.location.href = '/';
    return;
  }


  const refresh = ()=>{
    actions.actionRefresh();
  }

  const submitForm = (e,type)=>{

  // console.log(previewSource);
   e.preventDefault();
    if(type=="info")
    {
      actions.fetchChangeInfo(info.name,info.email,previewSource,info.account_type==1?"normal":"social");
      setTimeout(()=>refresh(),2000);
    }
    if(type=="password")
    {
      console.log(oldPassword,newPassword);
      actions.fetchChangePassword(oldPassword,newPassword);
      setTimeout(()=>refresh(),2000);
      setOpen(false);
      setNewPassword("");
      setOldPassword("");
    }
    // console.log(props)
    // setMessage(props.message);
  }
 
  return (
      <DefaultLayout refresh={refresh}>
        <form className={classes.form}>
          <div className={classes.root}>
            <Grid container direction="column" justify="center" spacing={3}>
              <Grid item xs={12}>
                <h2>My Profile</h2>
               {message && <Alert severity="info">{message}</Alert>}
              </Grid>

              <Grid item xs={12} sm={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <div>
                    {
                    previewSource?<Avatar alt={info.name} src={previewSource} style={{width:'100px',height:'100px'}} />: 
                    ( info.avatar != null ? <Avatar alt={info.name} src={info.avatar} style={{width:'100px',height:'100px'}} /> 
                    : <AccountCircleIcon fontSize="large"/> )
                    }</div> 
                     <div className={classes.uploadWrapper}>
                      <button className={classes.btn}>Upload avatar</button>
                      <input type="file" name="myfile" 
                       onChange={handleFileInputChange}
                       value={fileInputState}
                      className={classes.uploadBtnWrapperFile} />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Button variant="contained" color="primary" style={{textTransform:"none"}} onClick={handleClickOpen} >
                   Change password
                  </Button>
                  <ChangePassword open={open} handleClose={handleClose} 
                  oldPassword={oldPassword} newPassword={newPassword}
                  handleChangeOldPassword={handleChangeOldPassword} handleChangeNewPassword={handleChangeNewPassword}
                  onsubmit={(e)=>submitForm(e,"password")}/>
                  </Grid>
                </Grid>
              </Grid>
              

              <Grid item xs={12} sm={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      inputProps={{ maxLength: 32 }}
                      value={info.name}
                      onChange={(e)=>setInfo({...info,name:e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      value={info.email}
                      disabled={info.account_type!=1}
                      onChange={(e)=>setInfo({...info,email:e.target.value})}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                    disabled id="totalmatch" label="Total match" 
                    defaultValue={info.total_match} 
                    fullWidth variant="filled" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField disabled id="percentWin" label="Percent win" defaultValue={info.percent_win} fullWidth variant="filled" />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField disabled id="totalpoint" label="Total point" defaultValue={info.point} fullWidth variant="filled" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField disabled id="rank" label="Rank" defaultValue={info.rank} fullWidth variant="filled" />
                  </Grid>
                </Grid>
              </Grid>              

              <Grid item xs={12}>
                  <Button variant="contained" color="primary" style={{textTransform:"none"}} onClick={(e)=>submitForm(e,"info")}>
                    Update
                  </Button>
              </Grid>

              {/* <Grid item xs={12} style={{padding:'1%',border:'2px red',borderStyle:'dashed',textAlign:'center'}}>
                <div><h2 style={{color:"red",display:'inline-block',marginRight:'5px'}}>DANGER ZONE</h2><WarningIcon fontSize="large"/></div>
                        <Button
                  style={{textTransform:'none'}}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  fullWidth
                >
                  Delete Account
              </Button>
              </Grid> */}



            </Grid>
          </div>
    </form>
    </DefaultLayout>
  );
}
