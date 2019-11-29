import React, { Component } from 'react';
import Home from './pages/home/index';
import { Link } from 'react-router-dom';
import './css/pure-min.css';
import './css/pricing.css';
import './css/grids-responsive-min.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="pure-menu pure-menu-horizontal">
          <a href="https://github.com/" className="pure-menu-heading">Your Logo</a>
          <ul className="pure-menu-list">
            <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
            <li className="pure-menu-item"></li>
            <li className="pure-menu-item"><a href="https://github.com/" className="pure-menu-link">Contact</a></li>
          </ul>
        </div>



        <div className="l-content">
          {this.props.children}
        </div>

        <div className="footer l-box">
          <p>
            <a href="https://github.com/">Try now</a> for 14 days. No credit card required.
         </p>
        </div>
      </div>
    );
  }
}

