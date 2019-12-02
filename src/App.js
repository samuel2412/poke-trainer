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
          <ul className="pure-menu-list">
            <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
            <li className="pure-menu-item"><Link to="/pokemon" className="pure-menu-link">Pokemons</Link></li>
          </ul>
        </div>

        <div className="banner">
          <h1 className="banner-head">
            Pokedex
                </h1>
        </div>

        <div className="l-content">

          {this.props.children}

        </div>
      
        <div className="footer l-box">
        <a href="https://github.com/samuel2412">Developer GitHub</a>
        </div>
      </div>
    );
  }
}

