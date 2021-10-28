
import * as URL from 'url';

export const parseQueryParams = (req, _, next) => {
  req.parsedQuery = URL.parse(req._parsedUrl);
  next();
};
