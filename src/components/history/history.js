import React from 'react';
import DefaultLayout from "../layout/defaultLayout"
import HistoryTable from "./historyTable"
import CircularProgress from '@material-ui/core/CircularProgress';

export default function StickyHeadTable(props) {
  
  console.log(props);
  const { actions } = props;
  const { isFetching } = props;
  const { historyInfo } = props;

  if (!localStorage.getItem("token")) {
      window.location.href = "/login";
  }
  else{

    if(historyInfo)
    {
        return (
            <DefaultLayout>
                <HistoryTable historyInfo={historyInfo}/>
            </DefaultLayout>
        )
    }
    else if(!isFetching)
    {
        const token = localStorage.getItem('token');
        actions.fetchHistoryInfo(token);
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
