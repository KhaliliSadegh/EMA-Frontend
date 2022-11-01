import axios from "axios";
import {API_HOST} from '../api.config'

export default axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-type": "application/json"
  }
});