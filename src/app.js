const express = require('express')
const cors = require('cors');

const app = express()

app.use(cors());
app.use(express.urlencoded({extended: false}));

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST ||  process.env.CLIENT_URL || 'http://localhost');

app.listen(app.get('port'), () => console.log('App online => '+app.get('host')+':'+app.get('port')));
app.use('/', require('./routes/api'));