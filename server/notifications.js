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

router.get('/:userid/index/notifications',function(req,res){
    var userId = req.params.userid
    var today = new Date();
    var date = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();
    var day = year + '-' + month+ '-' + date

    knex('notes')
    .select('*')
    .where(knex.raw('date(dueDate)'),day)
    .andWhere('userId', userId)
    .andWhere('completed', null)
    .then(dueReminder =>
        knex('notes')
        .select(knex.raw('date(dueDate) as date, count(*) as count'))
        .groupBy(knex.raw('date(dueDate)'))
        .where(knex.raw('date(dueDate)'),'<',day)
        .andWhere('userId', userId)
        .andWhere('completed', null)
        .then(overDue => res.send({dueReminder: dueReminder, overDue: overDue}))
        );
})

module.exports = router;