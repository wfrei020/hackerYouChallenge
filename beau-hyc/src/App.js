import React, { Component } from 'react';
import logo from './images/beaus-beige-logo.svg';
import './App.css';
import LcboProductApi from './LcboProductApi.js';

//Auto generated javascript file from npm react

class App extends Component {

  
  render() {
      
    return (
      <div className="beau-main">
            <header className="beau-header">
                  <img src={logo} className="beau-logo" alt="logo" />
                  <h1 className="beau-title">Seasonal</h1>
            </header>
            <p className="beau-intro">
                  Canadians' experience a long and endless winter, why not enjoy the short summer
                  with Beau's Seasonal Beer crafted for a wonderful and unique experience.  Our certified organic beer, prepared with honest consideration
                  to our beautiful evironment and our local community, and delivered
                  with a sense of friendly relationships. 
            </p>
            {/* Call my LcboProductApi Component to display products from lcbo api, to keep this clean and small*/}
            <div><LcboProductApi /></div>
      </div>
      
 
    );
  }
}
export default App;
