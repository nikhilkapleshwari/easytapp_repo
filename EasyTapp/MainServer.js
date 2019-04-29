// var express = require('express');
// const bodyParser = require('body-parser');
// var cors = require('cors');

// var app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
// require('./routes')(app);

// app.listen(3001);

// console.log("EasyTapp listening on port 3001...");


var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');


var app = express();
var _dirname='C:/NodeJS_WorkSpace/EasyTapp';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static('dist/MyApp'));
require('./routes')(app);

app.all('*',(req,res)=>{
res.status(200).sendFile(_dirname+'/dist/MyApp/index.html');
});

app.listen(3001);

console.log("EasyTapp listening on port 3001...");
