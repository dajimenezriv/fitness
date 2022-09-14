import * as http from 'http';
import * as logger from './utils/logger';
import * as config from './utils/config';
import app from './app';

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
