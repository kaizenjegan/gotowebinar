import React, { useState, useContext } from "react";

import { FormGroup, FormControl, InputLabel, Input, TextField, Button, Typography, Link, Grid, useMediaQuery
, Snackbar, IconButton, StepIcon} from "@material-ui/core"
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import logo from './logo.svg';
import { useParams, useLocation } from 'react-router-dom';
import WebinarForm from "./WebinarCustomHook";
import {GotoMeetingAPI} from '../Api/GotoMeeting';
const rp = require('request-promise');


export interface IEvent {
  subject: string;
  description: string;
  startTime: string;
  endTime: string;
}

//todo move to form
const Webinar: React.FC = () => {
  const location = useLocation();
  const api = GotoMeetingAPI();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [webinarKey, setWebinarKey] = useState<string>("");



  const getResponseCode = () =>{
    const urlParams = new URLSearchParams(location.search);
    const myParam = urlParams.get('code');

    return myParam;
  }



  const createWebinar = (event:IEvent): any => {

    if(!event.subject || !event.description || !event.startTime || !event.endTime){
        alert('uh oh')
        return;
    }
    
    const webinar = {
      subject: event.subject,
      description: event.description,
      timeZone: "America/Los_Angeles",
      times:[
        {
          startTime: event.startTime,
          endTime: event.endTime
        }]
      }

      // const consumerCred = base64encode(`${consumer.key}:${consumer.secret}`);
      const respCode:string = getResponseCode() || "";
      // const authToken = getAuthToken(consumerCred, respCode);
      
      api.authenticate(respCode).then( (auth : any) => {
        auth = JSON.parse(auth);

        console.log(`response code; ${auth.access_token}`);

        api.createWebinar(auth.access_token, auth.organizer_key, webinar).then( (data:any) => {
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
    const {inputs, handleInputChange, handleSubmit} = WebinarForm({
      subject: "",
      description: "",
      startTime: "",
      endTime: ""
    }, createWebinar);

  return (
      
    <div >
        <h1>Create webinar</h1>

        <form  onSubmit={handleSubmit}>
            <FormControl margin="normal" fullWidth>
                <TextField id="standard-basic" label="Subject  (ex: Event Name)" 
                  name="subject"
                  onChange={handleInputChange} 
                  value={inputs.subject}
                /> <br />
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <TextField id="filled-basic" label="Description" variant="filled" multiline rows="4" 
                name="description"
                onChange={handleInputChange} 
                value={inputs.description}
                />
            </FormControl>
           
            <FormControl>
                startTime <TextField id="outlined-basic" type="datetime-local" 
                name="startTime"
                onChange={handleInputChange} 
                value={inputs.startTime}
                /> 
            </FormControl>

            <br /><br /><br />
            <FormControl>
                endtime: <TextField id="outlined-basic" type="datetime-local" 
                name="endTime"
                onChange={handleInputChange} value={inputs.endTime}
                /> 
            </FormControl>

            <div style={{paddingTop: "50px"}}>
                <Button type="submit" variant="contained" color="primary">
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