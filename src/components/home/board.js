import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BoardImage from "../../images/bg-login.jpg"
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import{
    Link
   } from "react-router-dom";
   
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={BoardImage}
          title={props.board.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h4">
           RoomID: {props.board.id}
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">
          Status:
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">
          Total people:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* Created by : {props.board.user.name} */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
         <Link to={"/board/"+props.board.id} style={{color:"black",textDecoration:"none"}}>   
            <Button size="small" color="primary">
            JOIN
            </Button>
        </Link>
        {props.board.password ? <LockIcon style={{marginLeft:'auto'}}/> : <LockOpenIcon style={{marginLeft:'auto'}}/>}

      </CardActions>
    </Card>
  );
}