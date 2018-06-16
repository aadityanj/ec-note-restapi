const express = require('express');
const app = express();

require('./middlewares/app.middleware')(app);

app.listen(3000, () => console.log('Ec-note End points listening on port 3000!'));
