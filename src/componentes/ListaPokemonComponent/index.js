import React, { Component } from 'react'
import axios from 'axios'
import Card from '../CardComponent/index'
import {
  useAsync,
  useAsyncAbortable,
  useAsyncCallback,
  UseAsyncReturn,
} from 'react-async-hook';

import { ReactNode, useState } from 'react';
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
      console.log(pokemons);
      this.setState({ pokemons ,nextURL: pokemons.next ,prevURL: pokemons.previous})
    }.bind(this));
  }

  prevPage = () => {
    this.loadPokemons(this.state.prevURL);
  }
  nextPage = () => {
    this.loadPokemons(this.state.nextURL);
  }

  render() {
    
    return (
      <div>

        <SearchPokemonExample></SearchPokemonExample>

        <div className="pricing-tables pure-g">

        {this.state.pokemons.map(pokemon => (
              <Card key={pokemon.name} pokeName={pokemon.name}></Card>
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
const SearchPokemon = async (text='') => {

  console.log(`${API_URL}${encodeURIComponent(text)}`)
  //const result = await fetch(`${API_URL}${encodeURIComponent(text)}`); 
  const result = await axios.get(`${API_URL}${encodeURIComponent(text)}`);
  if (result.status !== 200) {
    throw new Error('bad status = ' + result.status);
  }
  
  console.log(result.data)

  if (!(result.data === undefined)) {


    if(!(result.data.results === undefined)){
      
      PubSub.publish('updatePokemons', result.data.results);
      
    }else{
      PubSub.publish('updatePokemons', [result.data],null,null);
    }
  }
  //return await result;

};