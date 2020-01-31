const app = require('./app/index');
const api = require('./api/index');

const PORT = process.env.PORT || 80;
const PORT2 = process.env.PORT+1 || 3000;

app(PORT);
api(PORT2);
