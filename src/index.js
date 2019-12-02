import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/home/index'
import Pokemon from './pages/pokemon/index';
import PokemonDetalhe from './pages/pokemonDetalhe/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (
        <BrowserRouter>
            <Switch>
                <App>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/pokemon" component={ Pokemon } />
                    <Route path="/pokemon/:name" component={ PokemonDetalhe } />
                </App>
            </Switch>
        </BrowserRouter>

    ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
