import React from 'react'
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import {Webinar} from './Webinar';
import { Home } from './Home';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/oauth' component={Webinar} />
      </Switch>
    </BrowserRouter>
)

export default Routes