import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Router, Route, Redirect, withRouter } from 'react-router';
import { createBrowserHistory } from "history";



import IssueList from './components/IssueList'
import IssueEdit from './components/IssueEdit'
import Styles from './app.scss';

const history = createBrowserHistory()
const contentNode = document.getElementById('root');
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Issues() {
  return (
    <div>
      <h2>Issues</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>No found page</h2>
    </div>
  );
}


const RoutedApp = () => (
  <Router history={history} >
    <Redirect from="/" to="/issues" />
    <Route exact path="/issues" component={withRouter(IssueList)} />
    <Route exact path="/issues/:id" component={IssueEdit} />
  </Router>
)

ReactDOM.render(<RoutedApp />, contentNode);