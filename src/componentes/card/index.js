import React, { Component } from 'react';
import PokeAPI from '../../services/pokeapi';

export default class Card extends Component {

    constructor() {
        super();
        this.state = { pokemon: [{}], assets: '' };
        this.getTypes = this.getTypes.bind(this);
    }

    componentDidMount() {
        this.loadPokemon();
        this.setState({ assets: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.setAssets(this.props.pokeId, 3)}.png` })



    }

    loadPokemon = async () => {
        const response = await PokeAPI.get(`/pokemon/${this.props.pokeId}`);
        //console.log(response.data)
        const pokemon = response.data;

        this.setState({
            pokemon
        });
    }
    setAssets(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;

    }
    getTypes() {
        if (this.state.pokemon.types === undefined || this.state.pokemon.types.length <= 0) {
            return '';
        } else {
            if (this.state.pokemon.types.length === 2) {
                return `Types: ${(this.state.pokemon.types[1].type.name ? this.state.pokemon.types[1].type.name : '')},
             ${this.state.pokemon.types[0].type.name}`
            } else {
                return `Type: ${this.state.pokemon.types[0].type.name}`
            }
        }

    }

    render() {
        console.log(this.state.pokemon.stats)
      
        return (
            <div className="pure-u-1 pure-u-md-1-4">
                <div className="pricing-table pricing-table-biz pricing-table-selected">
                    <div className="pricing-table-header">
                        <h2>#{this.state.pokemon.id} {this.state.pokemon.name}</h2>
                        <img className="pure-img" src={this.state.assets} />
                    </div>


                    <ul className="pricing-table-list">
                        <li>{
                            this.getTypes()
                        }</li>
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