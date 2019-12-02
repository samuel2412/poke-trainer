import React, { Component } from 'react';



export default class Home extends Component {


    render() {
        return (
            <div>

                <div className="pricing-tables information">
                    <div className="pricing-tables.pure-g">
                        <div className="pure-u-1 pure-u-md-1-2">

                        <img className="pure-img" src={`/images/pokemon-topo.png`} alt="homePage" />

                        </div>
                        <div className="pure-u-1 pure-u-md-1-2">
                            <h1>Welcome!</h1>
                            <p style={{fontSize:"1.5em"}}>This is an application developed using React consuming the
                        <a href="https://pokeapi.co/"> PokéAPI </a>API via
                        <a href="https://github.com/axios/axios"> Axios</a>.</p>


                        </div>
                    </div>
                </div>
            </div>



        );
    }
}