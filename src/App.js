import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/pure-min.css';
import './css/pricing.css';
import './css/grids-responsive-min.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="pure-menu pure-menu-horizontal">
          <a href="https://github.com/samuel2412" className="pure-menu-heading">Your Logo</a>
          <ul className="pure-menu-list">
            <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
            <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Trainers</Link></li>
            <li className="pure-menu-item"><Link to="/pokemon" className="pure-menu-link">Pokemons</Link></li>
          </ul>
        </div>



        <div className="l-content">
          
          {this.props.children}

        </div>

        <div className="footer l-box">
          
        </div>
      </div>
    );
  }
}

