import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch'),
  };
  // do something
  // req.me = users[1];
  next();
});

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.use('/session', routes.session);
app.use('/user', routes.user);
app.use('/message', routes.message);

sequelize.sync().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});
