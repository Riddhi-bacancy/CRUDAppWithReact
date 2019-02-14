import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Form1 from './components/Form1';
import Form2 from './components/Form2';
import Form3 from './components/Form3';

import './App.css';

class App extends Component {
  render() {
    return (
      
      <div className="App">
        <ul>
         
          <li><Link to="/Insert">Insert</Link></li>
         
        </ul>
        
        <Route exact path="/" component={Form1}/>
        <Route path="/insert" component={Form2}/>
        <Route path="/edit/:id" component={Form3}/>
       
        
        
      </div>
    );
  }
}

export default App;
