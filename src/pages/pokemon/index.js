import React, { Component } from 'react';
import ListaPokemonComponent from '../../componentes/ListaPokemonComponent/index'


export default class Pokemon extends Component {


    render() {
        return (
            <div>

                <div className="banner">
                    <h1 className="banner-head">
                        Poke-Trainer
                </h1>
                </div>

                <div className="pricing-tables information">

                    <ListaPokemonComponent></ListaPokemonComponent>
        
                </div>
            </div>



        );
    }
}