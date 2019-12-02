import React, { Component } from 'react';
import ListaPokemonComponent from '../../componentes/ListaPokemonComponent/index'


export default class Pokemon extends Component {


    render() {
        return (
            <div>

               
                <div className="pricing-tables information">

                    <ListaPokemonComponent></ListaPokemonComponent>
        
                </div>
            </div>



        );
    }
}