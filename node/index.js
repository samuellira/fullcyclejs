const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Samuel Lira')`
const create = `create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id));`
connection.query(create)
connection.end()

app.get('/', (req, res) => {
    
    let table = ""
    let conn = mysql.createConnection(config)
    conn.query(sql)

    conn.query("SELECT * FROM people", function (err, result, fields) {
        if (err) throw err;
        for (const element of result) {
            table += '<tr><td>' + element.id + '</td><td>' + element.name + '</td></tr>';
        }
        table = '<table border="1"><tr><th>Nr.</th><th>Name</th></tr>' + table + '</table>';
        res.send('<h1>Full Cycle rocks!</h1><p>' + table)
    });
    conn.end()

})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})