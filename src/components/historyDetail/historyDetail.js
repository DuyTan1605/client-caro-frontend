import React,{useState} from 'react';
import DefaultLayout from "../layout/defaultLayout"
import CircularProgress from '@material-ui/core/CircularProgress';
import {useParams} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Chat from "./chat"
import Game from "./game"

export default function StickyHeadTable(props) {
    console.log(props);
  const {id:id} = useParams();
  const { actions } = props;
  const { isFetching } = props;
  const { historyDetail } = props;

  if (!localStorage.getItem("token")) {
      window.location.href = "/login";
  }
  else{

    if(historyDetail)
    {
        if(historyDetail[0])
        {
            return (
                <DefaultLayout>
                    <div style={{margin:'3%',overflow:"scroll"}}>
                            <Game 
                            gameHistory={JSON.parse(historyDetail[0].data)}  
                            competitorName={historyDetail[0].competitorName}
                            winnerId={historyDetail[0].winner}
                            winnerType={historyDetail[0].winnerType}
                            loserType={historyDetail[0].loserType}
                            finalResult = {historyDetail[0].type == "draw" ? "Draw" : (historyDetail[0].winner == historyDetail[0].competitorId ? "Lose" : "Win")}
                            chatHistory={JSON.parse(historyDetail[0].chat)}
                            />   
                    </div>
                </DefaultLayout>
            )
        }
        else{
            return (
                <DefaultLayout>
                    CAN NOT FIND HISTORY OF GAME
                </DefaultLayout>
            )
        }
    }
    else if(!isFetching)
    {
        const token = localStorage.getItem('token');
        actions.fetchHistoryDetail(token,id);
    }
    return (
        <DefaultLayout>
            <center>
                <CircularProgress />
            </center>
        </DefaultLayout>
    );
}
}
