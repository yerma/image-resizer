import express from 'express';
import routes, { logger } from './routes';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use('/api', logger, routes);

app.listen(port, (): void => {
  console.log(`Server listening on port ${port}`);
});

export default app;
