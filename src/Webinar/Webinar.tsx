import React, { useState, useContext } from "react";

import { FormGroup, FormControl, InputLabel, Input, TextField, Button, Typography, Link, Grid, useMediaQuery
, Snackbar, IconButton, StepIcon} from "@material-ui/core"
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import logo from './logo.svg';
import { useParams, useLocation } from 'react-router-dom';
var rp = require('request-promise');


//todo move to form
const Webinar: React.FC = () => {
  // const params = useParams();
  const location = useLocation();

  const consumer = {
    key: "",
    secret: ""
  }

  const [subject, setSubject] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [webinarKey, setWebinarKey] = useState<string>("");


const getResponseCode = () =>{
    const urlParams = new URLSearchParams(location.search);
    const myParam = urlParams.get('code');

    return myParam;
}

// console.log("params");
// console.log((params || {}).code);


if(location){
  let params = new URLSearchParams(location.search);

  console.log(params.get("code"));
}

const getAuthToken = (token: String, code:any) => {


const url = `https://api.getgo.com/oauth/v2/token?grant_type=authorization_code&code=${code}`

var options = {
  method: "POST",
  uri: url,
  headers: {
    'content-type': 'application/x-www-form-urlencoded', // Is set automatically
    Authorization: `Basic ${token}`
  }
  // body: webinar
};

  return rp(options);
}

const base64encode = (str:string): any =>{
  return window.btoa(str);
}
const createWebinar = (subject: String, description: String, startTime: String, endTime: String): any => {
    console.log(`${subject} ${description} ${startTime} ${endTime}`);
    if(!subject || !description || !startTime || !endTime){
        alert('uh oh')
        return;
    }
    
    const webinar = {
      subject: subject,
      description: description,
      timeZone: "America/Los_Angeles",
      times:[
        {
          startTime: startTime,
          endTime: endTime
        }]
      }

      const consumerCred = base64encode(`${consumer.key}:${consumer.secret}`);
      const respCode:string = getResponseCode() || "";
      // const authToken = getAuthToken(consumerCred, respCode);

      getAuthToken(consumerCred, respCode).then( (auth : any) =>{
        
        auth = JSON.parse(auth);

        console.log(`response code; ${auth.access_token}`);

        createWebinarRq(auth.access_token, auth.organizer_key, webinar).then( (data:any) => {
            // Process html like you would with jQuery...
            console.log(data);
            data = JSON.parse(data);
            let webinarKey = data.webinarKey;
            console.log(webinarKey);
            setOpen(true);
            setWebinarKey(webinarKey);
            //build link
        })
        .catch( (err:any) => {
            // Crawling failed or Cheerio choked...
            console.log(err);
        });
      });
  }

  const createWebinarRq = (token:string, organizerId:string, webinar:any) => {
    // Authorization: Bearer wjkQRRAz4VR9XMYEnfTRiIqZWVI7        
    const url = `https://api.getgo.com/G2W/rest/v2/organizers/${organizerId}/webinars`

    var options = {
      method: "POST",
      uri: url,
      body: JSON.stringify(webinar),
      headers: {
        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        "Authorization": `Bearer ${token}`
      }
    };

    return rp(options);
  }

  return (
      
    <div >
        <h1>Create webinar</h1>

        <form>
            <FormControl margin="normal" fullWidth>
                <TextField id="standard-basic" label="Subject  (ex: Event Name)" 
            value={subject}
            onChange={e => setSubject(e.target.value)}/> <br />
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <TextField id="filled-basic" label="Description" variant="filled" multiline rows="4" 
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
            </FormControl>
           
            <FormControl>
                startTime <TextField id="outlined-basic" type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)}/> 
            </FormControl>

            <br /><br /><br />
            <FormControl>
                endtime: <TextField id="outlined-basic" type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)}/> 
            </FormControl>

            <div style={{paddingTop: "50px"}}>
                <Button onClick={()=> { createWebinar(subject, description, startTime, endTime)} } variant="contained" color="primary">
                    Create
                </Button> 
            </div>
          </form>


          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isOpen}
          autoHideDuration={60000}
          onClose={()=>{
            setOpen(false);
          }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Webinar Created </span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={()=>{
              // setOpen(false);
              //setWebinarKey
              console.log(webinarKey);
              let webinarUrl = `https://dashboard.gotowebinar.com/webinar/${webinarKey}`;
              window.open(webinarUrl, '_blank');
            }}>
              Link
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={()=>{
                setOpen(false);
              }}
            >
              <IconButton />
            </IconButton>,
          ]}
        />
    </div>
  );
}

export {Webinar} ;