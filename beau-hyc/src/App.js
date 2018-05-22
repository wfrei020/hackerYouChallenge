import React, { Component } from 'react';
import logo from './images/beaus-beige-logo.svg';
import './App.css';
import './LcboProductApi.js';
import LcboProductApi from './LcboProductApi.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {products: [],
        };
    }
      componentDidMount(){
      this.LcboProducts();
  }
  
  
      LcboProducts(){
      fetch({url:"https://lcboapi.com/Products",
                        headers:{'Authorization':
                        'MDphNjhjNGUxZS01Yjc1LTExZTgtYjkzMy01M2EwZDBjMGQ1NDM6ako4YTU4RDRvU2tVanBHR0NjYmM5VGFUZzI3YVJ2QXBLbkw5'
      }})
   .then(({ results }) => this.setState({ products: results }));
                        
      
  }
  render() {
      
      
      
      
      
      
    return (
      <div className="beau-main">
        <header className="beau-header">
          <img src={logo} className="beau-logo" alt="logo" />
          <h1 className="beau-title">Summer Time</h1>
        </header>
        <p className="beau-intro">
          Canadians' experience a long and endless winter, why not enjoy the short summer
          with Beau's Seasonal Beer crafted for a wonderful and unique experience.  Our certified organic beer, prepared with honest consideration
          to our beautiful evironment and our local community, and delivered
          with a sense of friendly relationships. 
        </p>
        <div><LcboProductApi /></div>
        
      </div>
      
      /*
      <div id="layout-content" className="layout-content-wrapper">
        <div className="panel-list">{ products }</div>
      </div> */
    );
  }
  

 

  
  
}





export default App;
