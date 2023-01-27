import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from './Table';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const App = () => {
  Sentry.init({dsn: "https://555f8d1ba1d744a5a825947e1488f41a@o4504568720719872.ingest.sentry.io/4504572406398976",
    integrations: [new BrowserTracing()],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
  

const [accountData, setAccountData] = useState({});
const [accountId, setAccountId] = useState('');
const [errMessage, setErrMessage] = useState('');

const handleSubmit = (event) => {
  event.preventDefault();
  if (!Number(accountId)) {
    Sentry.captureMessage("Entered non-numeric value.");
  }
    axios.get(`http://codefestdemo.azurewebservices.net/accounts/${accountId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
        'Access-Control-Allow-Credentials': true,
      },
      withCredentials: true,
    }).then(response => {
      if(response && response.status === 200) {
        setAccountData(response.data);
        setErrMessage('');
      }
    }).catch((err) =>  {
     setErrMessage("Please enter the valid customer id.");
     Sentry.captureMessage("Invalid customer id");
     setAccountData('');
  });
  
}

return (
  <div className="App">
      <header style={{padding: '.5em', display: 'flex'}}><b>Display Account Information</b></header>
      {errMessage && (<p className="error"> {errMessage} </p>)}
      <p style={{padding: '.2em', display: 'flex'}}>
          &nbsp; &nbsp;Customer Id &nbsp;
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="acctId"
              name="acctId"
              value={accountId}
              onChange={(event) =>
                setAccountId(event.target.value)
              }
            /> 
            &nbsp; &nbsp; &nbsp; &nbsp; 
            <Button bsStyle="primary" type="submit">
                  Submit
            </Button>
            <br />
            <br />
          {Object.keys(accountData).length > 0 && <Table tableData={accountData} />} 
        </form>
      </p>
    </div>
)
}

export default App;