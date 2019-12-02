import React, { Component } from 'react';
import Card from '../../componentes/CardComponent/index';
import PubPub from 'pubsub-js';
import '../../css/types.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';




//<Card key={this.props.match.params.name} pokeName={this.props.match.params.name} ></Card>
export default class PokemonDetalhe extends Component {
    constructor() {
        super();
        this.state = { pokemon: {} }

    }
    componentDidMount() {
        PubPub.subscribe('pokemon', function (topico, pokemon) {
            this.setState({ pokemon })

        }.bind(this))


    }

    getTypes() {
        if (this.state.pokemon.types === undefined || this.state.pokemon.types.length <= 0) {
            return '';
        } else {
            if (this.state.pokemon.types.length === 2) {

                return (
                    <div>
                        <p className={`tipo ${this.state.pokemon.types[1].type.name}`}> {(this.state.pokemon.types[1].type.name ?
                            this.state.pokemon.types[1].type.name : '')}</p>
                        <p className={`tipo ${this.state.pokemon.types[0].type.name}`}> {(this.state.pokemon.types[0].type.name ?
                            this.state.pokemon.types[0].type.name : '')}</p>

                    </div>

                )

            } else {
                return (<p className={`tipo ${this.state.pokemon.types[0].type.name}`}> {(this.state.pokemon.types[0].type.name ?
                    this.state.pokemon.types[0].type.name : '')}</p>)

            }
        }
    }

    getStats() {
        if (this.state.pokemon.stats === undefined || this.state.pokemon.stats.length <= 0) {
            return '';
        } else {

            return (
                <div>
                    {this.state.pokemon.stats.map(stat => (
                      <div key={stat.stat.name}>
                          
                            <span><b>{stat.stat.name}</b></span>
                            <ProgressBar id="progress" style={{height:'3em'}} now={stat.base_stat} label={`${stat.base_stat}`} max="255" min="1" />
                           
                      </div>
                    ))}

                </div>
            )

        }
    }
    getAbilities(){
        if (this.state.pokemon.abilities === undefined || this.state.pokemon.abilities.length <= 0) {
            return '';
        } else {
            //console.log(this.state.pokemon.abilities)
            return (
                <div>
                    <span><b>Abilities: </b></span>
                    {this.state.pokemon.abilities.map((ability,index) => (

                    <span key={ index }>{(index=== (this.state.pokemon.abilities.length-1)) ? ability.ability.name+"." :  ability.ability.name+", "  }</span>

                    ))}
                
                </div>
            )

        }

    }


    render() {

        return (
            <div className="pricing-tables pure-g">

                <div className="pure-u-1 pure-u-md-1-2">

                    <div className="pricing-table pricing-table-free pricing-table-selected">

                        <Card pokeName={this.props.match.params.name}></Card>

                    </div>


                </div>
                <div className="pure-u-1 pure-u-md-1-2">

                    <h3>Type: </h3>
                    {this.getTypes()}
                    <br></br>
                     {this.getAbilities()}
                    <br></br>
                    {this.getStats()}
                    
                </div>
            </div>

        );
    }
}


