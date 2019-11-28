import React, { Component } from 'react'
import axios from 'axios'
import Card from '../CardComponent/index'



const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            pokemons: [{}],
            prevURL: '',
            nextURL: ''
        }
    }

    componentDidMount() {
        this.loadPokemons()
    }

    loadPokemons = async (url = `${API_URL}`) => {
        //console.log(url)
        await axios.get(url)
            .then(({ data }) => {
                this.setState({
                    pokemons: data.results, nextURL: data.next, prevURL: data.previous
                })
            })

        //console.log(this.state.pokemons)
    }

    prevPage = () => {
        this.loadPokemons(this.state.prevURL);
    }
    nextPage = () => {
        this.loadPokemons(this.state.nextURL);
    }


    getInfo = async () => {
        //console.log(`${API_URL}${this.state.query}`)
        await axios.get(`${API_URL}${this.state.query}`)
            .then(({ data }) => {
                if (!(data === undefined)) {
                    const aux = [data];
                    this.setState({
                        pokemons: aux,nextURL: null, prevURL: null
                    })
                }
            }).catch(error => {
                console.log(`😱 Axios request failed: ${error.response}`);
            });

    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {

                this.getInfo()

            } else if (!this.state.query) {
                this.loadPokemons()
            }
        } )
    }

    render() {
       // console.log(this.state.pokemons)
        return (
            <div>
                <form>
                    <input
                        placeholder="Search for..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />

                </form>
                <div className="pricing-tables pure-g">
                {this.state.pokemons.map(pokemon => (
                    
                    (pokemon.name === undefined ? '' : <Card key={pokemon.name} pokeName={pokemon.name}></Card>)

                ))}
                </div>
                <div className="actions">
                    <button disabled={this.state.prevURL == null} onClick={this.prevPage}>Previous</button>
                    <button disabled={this.state.nextURL == null} onClick={this.nextPage}>Next</button>
                </div>
            </div>
        )
    }
}

