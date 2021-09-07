import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Test from './Test';
import TestFinished from './TestFinished';
import TestResult from './TestResult';

function App() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Test} />
                <Route path='/testfinished/:seq' component={TestFinished} />
                <Route path='/testresult/:seq' component={TestResult} />
            </Switch>
        </div>
    );
}

export default App;