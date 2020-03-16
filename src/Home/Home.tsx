import React, { useState, useContext } from "react";

import { FormGroup, FormControl, InputLabel, Input, TextField, Button, Typography, Link, Grid, useMediaQuery
} from "@material-ui/core"
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import logo from './logo.svg';


export const Home: React.FC = () => {
    const preventDefault = (event:any) => event.preventDefault();

    return(<div>
        <h1>Home</h1>


        <Link href="https://api.getgo.com/oauth/v2/authorize?client_id=pTSMx3bOCnEykUzvAFRpboIsiHAA0Shv&response_type=code" color="inherit">
            Login 
        </Link>
    </div>)
}