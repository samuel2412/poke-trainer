import React, { Component } from 'react';
import Home from './pages/home/index';
import './css/pure-min.css';
import './css/pricing.css';
import './css/grids-responsive-min.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading">Your Logo</a>
          <ul className="pure-menu-list">
            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
            <li className="pure-menu-item pure-menu-selected"><a href="#" className="pure-menu-link">Pricing</a></li>
            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Contact</a></li>
          </ul>
        </div>

       

        <div className="l-content">
            <Home/>
        </div>
        
        <div className="footer l-box">
          <p>
            <a href="#">Try now</a> for 14 days. No credit card required. Header image courtesy of <a href='http://unsplash.com/'>Unsplash</a>.
    </p>
        </div>
      </div>
    );
  }
}

