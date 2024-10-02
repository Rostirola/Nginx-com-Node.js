import express from 'express';
import { createConnection } from 'mysql2';

const app = express();
const port = 3000;

const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'people_db'

};

const connection = createConnection(config);

const sql = `INSERT INTO people (name) VALUES ('Juan')`;
connection.query(sql);

app.get('/', (req, res) => {

    connection.query('SELECT * FROM people', (err, results) => {
        if (err) throw err;

        let response = '<h1>Full Cycle Rocks!</h1><ul>';
        results.forEach(person => {
            response += `<li>${person.name}</li>`;
        });
        response += '</ul>';

        res.send(response);
    });
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
