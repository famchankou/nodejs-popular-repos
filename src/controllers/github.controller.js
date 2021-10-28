import { GithubService } from '../services';
import { logger } from '../logger';
import {
  parseParams,
  stringify,
} from '../utils';

export default class GithubController {
  /**
   * Fetches GitHub repos via query params
   * @param {*} req 
   * @param {*} res 
   */
  static async search(req, res) {
    const methodName = 'GithubController:search';
    logger.info(`${methodName} [${req.method} - ${req.ip} - ${req.originalUrl} - ${stringify(req.query)}]`);

    try {
      const response = await GithubService.searchRepos(parseParams(req.query));
      const { data } = response;

      if (data?.items) {
        res.status(200).json(data.items);
      } else {
        res.status(404);
      }
    } catch (error) {
      logger.error(`${methodName}:error [${req.method}  - ${req.originalUrl} - ${req.ip} - ${error.message}]`);
      res.status(422);
    }
  }

  /**
   * Fetches GitHub repos via params
   * @param {*} req 
   * @param {*} res 
   */
  static async getByLang(req, res) {
    const methodName = 'GithubController:getByLang';
    logger.info(`${methodName} [${req.method} - ${req.ip} - ${req.originalUrl} - ${stringify(req.params)}]`);

    try {
      const response = await GithubService.getReposByLang(parseParams(req.params));
      const { data } = response;

      if (data?.items) {
        res.status(200).json(data.items);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      logger.error(`${methodName}:error [${req.method}  - ${req.originalUrl} - ${req.ip} - ${error.message}]`);
      res.status(422);
    }
  }
}
