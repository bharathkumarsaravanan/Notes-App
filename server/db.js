const express = require('express');
const app = express();
const path = require('path');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(path.resolve(__dirname,'./database.db'));


const knex = require('knex')({
    client:'sqlite3',
    connection:{
        filename: './database.db'
    },
    useNullAsDefault: true
});

// db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, password STRING, created_at TIMESTAMP)')
// db.run('CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, note STRING, created_at TIMESTAMP, dueDate TIMESTAMP)')

// db.run('ALTER TABLE notes ADD COLUMN completed TIMESTAMP')

var today = new Date();
var date = ("0" + today.getDate()).slice(-2);
var month = ("0" + (today.getMonth() + 1)).slice(-2);
var year = today.getFullYear();
var day = year + '-' + month+ '-' + date

// knex('notes')
// .select(knex.raw('date(dueDate) as date, count(*) as count'))
// .groupBy(knex.raw('date(dueDate)'))
// .where(knex.raw('date(dueDate)'),'<',day)
// // .andWhere('userId', userId)
// .then(overDue => console.log(overDue))

knex('notes')
.update('completed', null)
.where('id', 24)
.then(e => console.log(e))