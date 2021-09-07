import { React, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import Test from './Test';
import TestFinished from './TestFinished';
import TestResult from './TestResult';
import ReactGA from 'react-ga';


function App() {
    useEffect(() => {
        ReactGA.initialize('UA-206689346-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, []) 
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