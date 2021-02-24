import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserInfo from './UserInfo';
import TestExample from './TestExample';
import Test from './Test';
import TestFinished from './TestFinished';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={UserInfo} />
      <Route path='/testexample' component={TestExample} />
      <Route path='/test' component={Test} />
      <Route path='/testfinished' component={TestFinished} />
    </Switch>
  </BrowserRouter>
 ,document.getElementById('root')
);



