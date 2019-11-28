import axios from 'axios';

const PokeAPI = axios.create({baseURL: ''});

export default PokeAPI;