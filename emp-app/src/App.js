import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Users from './components/Users';
import AddUser from './components/AddUser';
import './App.css';

class App extends Component {

  render(){
    return (
      <Router>
           <Switch>
             <Route path='/users/:id' component={AddUser}/>
             <Route path='/' component={Users}/>
           </Switch> 
        </Router>
    )
  }
}

export default App;