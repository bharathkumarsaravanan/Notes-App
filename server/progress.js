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

router.get('/:userid/progress/notescount', function(req,res){
    var userId = req.params.userid;

    knex('notes')
    .select(knex.raw('completed, count(*) as count'))
    .groupBy('completed')
    .where('userid', userId)
    .andWhere('completed', null)
    .then(pending => 
            knex('notes')
            .select(knex.raw('count(*) as count'))
            .where('userid', userId)
            .then(allCount => res.send({allNoteCount: allCount, pendingCount: pending})))

})

router.get('/:userid/progress/overdue', function(req,res){
    var userId = req.params.userid;
    var today = new Date();
    var date = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();
    var day = year + '-' + month+ '-' + date

    knex('notes')
    .select(knex.raw('title,date(created_at) as created, date(dueDate) as due'))
    .where(knex.raw('date(dueDate)'),'<',day)
    .andWhere('userId', userId)
    .andWhere('completed', null)
    .then(datas => res.send({values: datas}));
})

module.exports = router;