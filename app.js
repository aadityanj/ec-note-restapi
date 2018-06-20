const express = require('express');
const app = express();
const config = require('./config/config.json');

require('./middlewares/app.middleware')(app);

app.listen(config.port, () => console.log('Ec-note End points listening on port 3000!'));
