const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(path.resolve(__dirname,'./database.db'));

app.use(bodyParser.urlencoded({
    extended: true
}))

const knex = require('knex')({
    client:'sqlite3',
    connection:{
        filename: './database.db'
    },
    useNullAsDefault: true
});


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cors())
app.use(require('./index'))
app.use(require('./schedule'))
app.use(require('./notifications'))
app.use(require('./progress'))


app.post('/login', function(req,res){
    console.log(req.body);
    var body = req.body;
    knex('users')
    .select('id')
    .where('email', body.email)
    .andWhere('password', body.password)
    .then(userid => res.send({authentication: userid.length!==0, userId: userid}))
});

app.post('/signup', function(req,res){
    console.log(req.body);
    var body = req.body;
    knex.insert({
        name: body.name,
        email: body.email,
        password: body.password,
        created_at: knex.raw('CURRENT_TIMESTAMP')
    }).into('users')
    .then((message) => res.send({message: message}));
});

app.listen(4000,function(){
    console.log('localhost:4000')
})