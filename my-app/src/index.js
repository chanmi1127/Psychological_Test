import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserInfo from './UserInfo';
import TestExample from './TestExample';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={UserInfo} />
      <Route path='/testexample' component={TestExample} />
    </Switch>
  </BrowserRouter>
 ,document.getElementById('root')
);



