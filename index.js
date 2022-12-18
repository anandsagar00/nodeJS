var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", 'ejs');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

con.connect(function (error, result) {
    if (error) {
        console.log("Error");
        throw error;
    }
    else {
        console.log("Connected.\n");
        stmt = "select * from student";
        con.query(stmt, function (err, res) {
            if (err) {
                console.log("Error");
                throw err;
            }
            else {
                console.log(res);
            }
        })
    }
})

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/register.html');

})

app.post('/', function (req, res) {
    var name = req.body.name;
    var marks1 = req.body.marks1;
    var marks2 = req.body.marks2;
    var stmt = 'insert into student (student_name,marks1,marks2) values ("' + name + '","' + marks1 + '","' + marks2 + '")'
    con.query(stmt, function (error) {
        if (error)
            throw error;
        else
            res.redirect('/students');
    })
})

app.get('/students', function (req, res) {
    var stmt = "select * from student";
    con.query(stmt, function (error, result) {
        if (error)
            throw error;
        else {
            res.render(__dirname + '/students', { students: result });
        }
    })
})

app.get('/delete-student', function (req, res) {
    stmt = "delete from student where id=" + req.query.id;
    con.query(stmt, function (error, result) {
        if (error)
            throw error;
        else {
            res.redirect('/students');
        }
    })
})
app.get('/update-student', function (req, res) {
    id = req.query.id;
    stmt = "select * from student where id=" + id;
    con.query(stmt, function (error, result) {
        if (error)
            throw error;
        else {
            res.render(__dirname + '/update', { student: result });
        }
    })
})

app.post('/update-student', function (req, res) {
    var name = req.body.name;
    var marks1 = req.body.marks1;
    var marks2 = req.body.marks2;
    var id = req.body.id;
    stmt = "update student set student_name = ? , marks1= ? , marks2 = ? where id = ?";
    con.query(stmt, [name, marks1, marks2, id], function (error, result) {
        if (error)
            throw error;
        else {
            res.redirect('/students');
        }
    })
})

app.listen(7070);
