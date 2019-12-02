import React, { Component } from 'react';
import PokeAPI from '../../services/pokeapi';
import PubSub from 'pubsub-js'

export default class Card extends Component {

    constructor() {
        super();
        this.state = { pokemon: [{}] };
    }

    componentDidMount() {
        // console.log(this.props.pokeName)
        this.loadPokemon();
    }

    loadPokemon = async () => {
        const response = await PokeAPI.get(`https://pokeapi.co/api/v2/pokemon/${this.props.pokeName}`);

        const pokemon = response.data;

        this.setState({
            pokemon
        });
        //console.log(pokemon)
        PubSub.publish('pokemon',pokemon)
    }
    setAssets(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;

    }


    render() {
        //console.log(this.state.pokemon.id)
        var title =  ( this.state.pokemon.id === undefined ? '' : `#${this.state.pokemon.id} ${this.state.pokemon.name}`);
        return (
           
                        <div className="pricing-table-header">
                            <h2>{title}</h2>
                            <img className="pure-img" src={`/images/${this.setAssets(this.state.pokemon.id, 3)}.png`} alt={this.state.pokemon.name} />
                        </div>
                   
        );
    }
}