import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Test from './Test';
import TestFinished from './TestFinished';
import TestResult from './TestResult';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' component={Test} />
      <Route path='/testfinished/:seq' component={TestFinished} />
      <Route path='/testresult/:seq' component={TestResult} />
    </Switch>
  </BrowserRouter>
 ,document.getElementById('root')
);



