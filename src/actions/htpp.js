import axios from 'axios';

const http = axios.create({
  baseURL: 'https://eactjsteachingproj.herokuapp.com/'
})


export default http;