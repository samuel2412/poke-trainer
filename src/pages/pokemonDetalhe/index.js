import React, { Component } from 'react';
import { useParams } from "react-router-dom";



export default class PokemonDetalhe extends Component {



    render() {

        return (
            <div>

                <div className="banner">
                    <h1 className="banner-head">
                        Poke-Trainer
                </h1>
                </div>

                <div className="pricing-tables information">

                  
                    <Child></Child>

                </div>
            </div>



        );
    }
}
function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    console.log(id)

    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    );
}

