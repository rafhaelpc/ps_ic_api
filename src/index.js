const express = require('express');
require('express-async-errors');
const routes = require('./routes');
var cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  console.log('### Error Handler');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('Server started at port 3000'));
