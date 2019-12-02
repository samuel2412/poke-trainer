import React, { Component } from 'react'
import axios from 'axios'
import Card from '../CardComponent/index'
import {
  useAsync
} from 'react-async-hook';

import { Link } from 'react-router-dom';

import { useState } from 'react';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import PubSub from 'pubsub-js'



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
  //https://pokeapi.co/api/v2/pokemon/?offset=800&limit=20
  componentDidMount() {
    //this.loadPokemons()
    PubSub.subscribe('updatePokemons', function (topico, pokemons) {

      this.setState({ pokemons })
    }.bind(this));

    PubSub.subscribe('updateNext', function (topico, nextURL) {
      //console.log(nextURL)
      this.setState({ nextURL })
    }.bind(this));

    PubSub.subscribe('updatePrev', function (topico, prevURL) {
      // console.log(prevURL)
      this.setState({ prevURL })
    }.bind(this));

  }

  prevPage = () => {
    this.loadPokemons(this.state.prevURL);
  }
  nextPage = async () => {
    this.loadPokemons(this.state.nextURL);
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



  render() {

    return (
      <div>
        
        <label>Search: </label>
        <SearchPokemonExample></SearchPokemonExample>

        <div className="pricing-tables pure-g">


          {this.state.pokemons.map(pokemon => (
            <div key={pokemon.url} className="pure-u-1 pure-u-md-1-3" >

              <div className="pricing-table pricing-table-biz pricing-table-selected">
                <Link to={`/pokemon/${pokemon.name}`} >

                  <Card pokeName={pokemon.name}></Card>
                </Link>
              </div>


            </div>
            // (pokemon.name === undefined ? '' : <Card key={pokemon.name} pokeName={pokemon.name}></Card>)

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



const UsesearchPokemon = () => {

  // Handle the input text state
  const [inputText, setInputText] = useState('');

  // Debounce the original search async function
  const debouncedsearchPokemon = useConstant(() =>
    AwesomeDebouncePromise(SearchPokemon, 600)
  );

  const search = useAsync(
    async () => {
      if (inputText.length === 0) {
        return debouncedsearchPokemon();
      } else {
        return debouncedsearchPokemon(inputText);
      }
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [inputText]
  );

  // Return everything needed for the hook consumer


  return {
    inputText,
    setInputText,
    search
  };
};


const SearchPokemonExample = () => {

  const { inputText, setInputText, search } = UsesearchPokemon();
  return (
    <div>
      <input value={inputText} onChange={e => setInputText(e.target.value)} />
      <div>
        {search.loading && <div>...</div>}
        {search.error && <h3>Pokemon not found.</h3>}



      </div>
    </div>
  );
};
/*
 {search.result && (
                  <div>
                      <div>Results: {search.result.length}</div>
                      <ul>
                          
                      <li key={search.result.name}>{search.result.name}</li>    
                          
                      </ul>
                  </div>
              )}


               {pokemons.map(pokemon => (
          <Card key={pokemon.name} pokeName={pokemon.name}></Card>
          // (pokemon.name === undefined ? '' : <Card key={pokemon.name} pokeName={pokemon.name}></Card>)
        ))}

*/
const SearchPokemon = async (text = '') => {

  //console.log(`${API_URL}${encodeURIComponent(text)}`)
  //const result = await fetch(`${API_URL}${encodeURIComponent(text)}`); 
  const result = await axios.get(`${API_URL}${encodeURIComponent(text.toLowerCase())}`);
  if (result.status !== 200) {
    throw new Error('bad status = ' + result.status);
  }

  //console.log(result.data)

  if (!(result.data === undefined)) {


    if (!(result.data.results === undefined)) {

      PubSub.publish('updatePokemons', result.data.results);
      PubSub.publish('updateNext', result.data.next);
      PubSub.publish('updatePrev', result.data.previous);
    } else {
      PubSub.publish('updatePokemons', [result.data]);
      PubSub.publish('updateNext', null);
      PubSub.publish('updatePrev', null);
    }
  }
  //return await result;

};