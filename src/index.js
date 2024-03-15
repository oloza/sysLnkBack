const app = require('./app');
require('./database');

async function init(){
    await app.listen(4010);
    console.log('Server on Port 4010');
}

init();