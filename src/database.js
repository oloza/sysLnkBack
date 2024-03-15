const mongoose = require('mongoose');

 mongoose.connect('mongodb://127.0.0.1/linkSys')
 .then(db=> console.log('Database connected'));
