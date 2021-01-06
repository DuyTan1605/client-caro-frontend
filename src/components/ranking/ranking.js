import React from "react"
import DefaultLayout from "../layout/defaultLayout"
import TableRanking from "./tableRanking"
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Ranking(props)
{
    console.log(props);
    const { actions } = props;
    const { isFetching } = props;
    const { rankingInfo } = props;

    if (!localStorage.getItem("token")) {
        window.location.href = "/login";
    }
    else{

        if(rankingInfo)
        {
            return (
                <DefaultLayout>
                    <TableRanking rankingInfo={rankingInfo}/>
                </DefaultLayout>
            )
        }
        else if(!isFetching)
        {
            const token = localStorage.getItem('token');
            actions.fetchRanking(token);
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