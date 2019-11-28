import React, { Component } from 'react';
import PokeAPI from '../../services/pokeapi';

export default class Card extends Component {

    constructor(){
        super();
        this.state = { pokemon: [{}],assets:'' };
        
    }

    componentDidMount(){
        this.loadPokemon();
    }

    loadPokemon = async () =>{
        const response = await PokeAPI.get(`/pokemon/${ this.props.pokeId }`);
      
        this.setState({ pokemon: response.data, 
        assets: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ this.setAssets(this.props.pokeId, 3) }.png` });
    }
    setAssets( n, width, z){
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
                    
    }


    render() {
        return (
            <div className="pure-u-1 pure-u-md-1-4">
                <div className="pricing-table pricing-table-biz pricing-table-selected">
                    <div className="pricing-table-header">
                        <h2>#{ this.state.pokemon.id } { this.state.pokemon.name }</h2>
                        <img className="pure-img" src={ this.state.assets } />
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