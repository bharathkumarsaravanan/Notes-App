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

router.get('/:userid/index/schedule', function(req,res){
    var userId = req.params.userid;
    knex('notes')
    .select(knex.raw('date(dueDate) as date,count(*) as count'))
    .groupBy(knex.raw('date(dueDate)'))
    .where('userId', userId)
    .andWhere('completed',null)
    .orderByRaw('date(dueDate)')
    .then(scheduleData => 
        knex('notes')
        .select(knex.raw('date(created_at) as date,count(*) as count'))
        .groupBy(knex.raw('date(created_at)'))
        .where('userId', userId)
        .andWhere('completed',null)
        .orderByRaw('date(created_at) DESC')
        .then(createdCount => res.send({scheduleData: scheduleData, createdCount: createdCount})));
})

router.get('/:userid/index/schedule/due/:date', function(req,res){
    var userId = req.params.userid;
    var date = req.params.date;
    console.log(date);
    knex('notes')
    .select(knex.raw('id,title,note,date(created_at) as created_at,date(dueDate) as dueDate'))
    .whereRaw('date(dueDate)=?',date)
    .andWhere('userId', userId)
    .andWhere('completed', null)
    .then(notes => res.send({notes: notes}))
    
})

router.get('/:userid/index/schedule/created/:date', function(req,res){
    var userId = req.params.userid;
    var date = req.params.date;
    console.log(date);
    knex('notes')
    .select(knex.raw('id,title,note,date(created_at) as created_at,date(dueDate) as dueDate'))
    .whereRaw('date(created_at)=?',date)
    .andWhere('userId', userId)
    .andWhere('completed', null)
    .then(notes => res.send({notes: notes}))
    
})


module.exports = router;