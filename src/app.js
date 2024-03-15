const express =  require('express');
const cors= require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(require('./controllers/linkController'));

module.exports=app;