import React, { Component } from 'react';
import PokeAPI from '../../services/pokeapi';

export default class Card extends Component {

    constructor(){
        super();
        this.state = { pokemon: [{}] };
    }

    componentDidMount(){
        this.loadPokemon();
    }

    loadPokemon = async () =>{
        
        //console.log(`/pokemon/${ this.props.pokeName }`)
        const response = await PokeAPI.get(`/pokemon/${ this.props.pokeId }`);
        //console.log(response.data)
        this.setState({ pokemon: response.data });
    }
    //<img className="pure-img" src=" https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" />
    render() {
        return (
            <div className="pure-u-1 pure-u-md-1-4">
                <div className="pricing-table pricing-table-biz pricing-table-selected">
                    <div className="pricing-table-header">
                        <h2>#{ this.state.pokemon.id } { this.state.pokemon.name }</h2>

                        <span className="pricing-table-price">
                            $25 <span>per month</span>
                        </span>
                    </div>

                    <ul className="pricing-table-list">
                        <li>Free setup</li>
                        <li>Use your own domain</li>
                        <li>Standard customer support</li>
                        <li>10GB file storage</li>
                        <li>5 databases</li>
                        <li>Unlimited bandwidth</li>
                    </ul>

                    <button className="button-choose pure-button">Choose</button>
                </div>
              

            </div>
        );
    }
}