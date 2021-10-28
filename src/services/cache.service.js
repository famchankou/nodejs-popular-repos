import NodeCache from 'node-cache';
import { logger } from '../logger';

export default class CacheService {
  #cache = null;
  
  constructor(ttlSeconds) {
    this.#cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  async get(key, fetch) {
    const value = this.#cache.get(key);
    
    if (value) {
      logger.info(`Cache: [key:${key} - ${value}}]`);
      return Promise.resolve(value);
    }

    let result = null;
    try {
      result = await fetch();
      this.#cache.set(key, result);
    } catch (error) {
      logger.info(`Cache:Error: [key:${key} - ${error.message}}]`);
      throw error;
    }

    return result;
  }

  del(keys) {
    this.#cache.del(keys);
  }

  delStartWith(startStr = '') {
    if (!startStr) {
      return;
    }

    const keys = this.#cache.keys();
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
  }

  flush() {
    this.#cache.flushAll();
  }
}
