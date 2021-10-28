import app from './src/app';
import { logger } from './src/logger';

const PORT = process.env.HTTP_PORT || 8080;

app.listen(PORT, _ => {
  logger.info('Server started on port ' + PORT);
});
