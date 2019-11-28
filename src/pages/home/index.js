import React, { Component } from 'react';
import PokeAPI from '../../services/pokeapi'
import Card from '../../componentes/card/index'


export default class Home extends Component {

    constructor() {
        super();
        this.state = { pokemons: [{}], ids: [] };
    }

    componentDidMount() {
        this.loadPokemons();
    }

    loadPokemons = async () => {
        const response = await PokeAPI.get('/pokemon');
        this.setState({ pokemons: response.data.results });

        const ids = this.getId();
        this.setState({ ids });

    }

    getId() {
        var novosIds = [];
        this.state.pokemons.map(pokemon => {
            if (typeof pokemon.url !== 'undefined') {
                const res = pokemon.url.split("/");
                novosIds.push(res[6]);
            }
        });
        console.log(novosIds)
        return novosIds;

        //console.log(res[6])

    }


    render() {
        return (
            <div>
                <div className="banner">
                    <h1 className="banner-head">
                       Bem-vindo.
                    </h1>
                </div>


                <div className="pricing-tables pure-g">
                    {this.state.ids.map(index => (

                        <Card pokeId={index}></Card>

                    ))}
                </div>

                <div className="information pure-g">
                    <div className="pure-u-1 pure-u-md-1-2">
                        <div className="l-box">
                            <h3 className="information-head">Get started today</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
                        </div>
                    </div>

                    <div className="pure-u-1 pure-u-md-1-2">
                        <div className="l-box">
                            <h3 className="information-head">Pay monthly or annually</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                </p>
                        </div>
                    </div>

                    <div className="pure-u-1 pure-u-md-1-2">
                        <div className="l-box">
                            <h3 className="information-head">24/7 customer support</h3>
                            <p>
                                Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                        </div>
                    </div>

                    <div className="pure-u-1 pure-u-md-1-2">
                        <div className="l-box">
                            <h3 className="information-head">Cancel your plan anytime</h3>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}