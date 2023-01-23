const express = require('express');
const app = express();
const router = express.Router();

const path = require('path');
const bodyParser = require('body-parser');

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

router.use(function timeLog(req,res,next){
    next();
});

router.post('/:userid/index/home/createnote', function(req,res){
    var body = req.body;
    var userId = req.params.userid; 
    console.log(body);

    knex.insert({
        userId: userId,
        title: body.title===''?null:body.title,
        note: body.note,
        created_at: knex.raw('CURRENT_TIMESTAMP'),
        dueDate: body.dueDate===''?null:body.dueDate
    }).into('notes')
    .then(id => 
        knex('notes')
        .select('*')
        .where('id', id)
        .then((newNote) => res.send({newNote: newNote})))
});

router.post('/:userid/index/notes/done', function(req,res){
    var body = req.body;
    var userId = req.params.userid;
    console.log(body);

    knex('notes')
    .update('completed',knex.raw('CURRENT_TIMESTAMP'))
    .whereIn('id', body)
    .then(message => res.send({message: 'Congrats!'}))    
})

router.post('/:userid/index/home/deletenote', function(req,res){
    var body = req.body;
    console.log(body);
    knex('notes')
    .del()
    .whereIn('id', body)
    .then(message => res.send({message: message}));
})

router.get('/:userid/index/home/notes', function(req,res){
    var userId = req.params.userid;

    knex('notes')
    .select('*')
    .where('userId', userId)
    .andWhere('completed', null)
    .then((datas) => res.send({datas: datas}));

})

router.get('/:userid/index/home/view/:id', function(req,res){
    var userId = req.params.userid;
    var id = req.params.id;

    knex('notes')
    .select(knex.raw('id,title,note, date(created_at) as created_at,date(dueDate) as dueDate, userId'))
    .where('userId', userId)
    .andWhere('id', id)
    .then((viewData) => {

        res.send({view: viewData})});

})

router.post('/:userid/index/home/update/:id', function(req,res){
    var userId = req.params.userid;
    var id = req.params.id;
    var body = req.body;
    console.log(body);

    knex('notes')
    .update(body)
    .where('userId', userId)
    .andWhere('id', id)
    .then((updateId) => res.send({id: updateId}));

})



module.exports = router;