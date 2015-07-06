var express = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str,path){
    return stylus(str).set('filename',path);
}

app.set('views',__dirname + '/server/views');
app.set('view engine','jade');
app.use(stylus.middleware(
    {
        src:__dirname+'/public',
        compile:compile
    }
));
app.use(express.static(__dirname+'/public'));
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*',function(req,res){
    res.render('index');
});

var port = 3030;

app.listen(port,function(){
   console.log('listening to '+port);
});
