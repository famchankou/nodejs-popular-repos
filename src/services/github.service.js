import axios from 'axios';
import { logger } from '../logger';
import CacheService from './cache.service';
import {
  sortParamsToStr,
  searchParamsToStr,
} from '../utils';

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl);

axios.interceptors.request.use(request => {
  logger.info(`Axios:request [${request.method.toUpperCase()} - ${request.url}}]`);
  return request;
})

axios.interceptors.response.use(response => {
  logger.info(`Axios:response [${response.status} - ${response.statusText}]`);
  return response;
})

class GithubService {
  #transport = null;
  #baseEndpoint = 'https://api.github.com/search/repositories'

  constructor(transport) {
    this.#transport = transport;
  }

  async searchRepos({ sortParams, searchParams }) {
    const sortQueryStr = sortParamsToStr(sortParams);
    const searchQueryStr = searchParamsToStr(searchParams);
    const url = `${this.#baseEndpoint}?${sortQueryStr}q=${searchQueryStr}`;

    return cache.get(url, _ => this.#transport.get(url));
  }

  async getReposByLang({ sortParams, searchParams }) {
    const sortQueryStr = sortParamsToStr(sortParams);
    const searchQueryStr = searchParamsToStr(searchParams);
    const url = `${this.#baseEndpoint}?${sortQueryStr}q=${searchQueryStr}`;

    return cache.get(url, _ => this.#transport.get(url));
  }
}

export default new GithubService(axios);
