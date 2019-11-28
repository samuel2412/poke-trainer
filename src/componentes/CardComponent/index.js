import React, { Component } from 'react';
import PokeAPI from '../../services/pokeapi';

export default class Card extends Component {

    constructor() {
        super();
        this.state = { pokemon: [{}], assets: '' };
    }

    componentDidMount() {
       // console.log(this.props.pokeName)
        this.loadPokemon();
    }

    loadPokemon = async () => {
        const response = await PokeAPI.get(`https://pokeapi.co/api/v2/pokemon/${this.props.pokeName}`);
        //console.log(response.data)
        const pokemon = response.data;

        this.setState({
            pokemon,
            assets: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.setAssets(response.data.id, 3)}.png`
        });
    }
    setAssets(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;

    }


    render() {
        //console.log(this.state.pokemon.stats)

        return (
            <div className="pure-u-1 pure-u-md-1-3">
                
                    <div className="pricing-table pricing-table-biz pricing-table-selected">
                    <a href={this.state.pokemon.name}>
                        <div className="pricing-table-header">
                            <h2>#{this.state.pokemon.id} {this.state.pokemon.name}</h2>
                            <img className="pure-img" src={this.state.assets} alt="{this.state.pokemon.name}" />
                        </div>
                        </a>
                    </div>
               

            </div>
        );
    }
}