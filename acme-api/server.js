const { request, response } = require('express');
const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());
app.use(express.json());

const { Pool } = require('pg');



app.get("/config", async (request, response) => {
    const statusOptions = await pool.query(`
    SELECT id, value
    FROM status`);
    response.status(200).send({options: statusOptions.rows});
});

app.post("/login", async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const userDetails = await pool.query(`SELECT id, name, email
    FROM users
    WHERE username = $1
    AND check_password(id, $2)`, [username, password]);
    response.status(200).send(userDetails.rows[0])
});

app.get("/status", async (request, response) => {
    const results = await pool.query(`
    SLECT users.name AS "name", status.value AS "status"
    FROM users JOIN user_status ON user_id = users.id
    JOIN status ON status_id = status.id`);
    response.status(200).send(results.rows);
});
app.get('/status/:user', async (request, response) => {
    const userid = request.params.user;
    const sql = `
    SELECT status.value AS "status", created
    FROM status
    JOIN user_status ON status_id = status.id AND user_id = $1
    ORDER BY created DESC
    LIMIT 1`;
    const query = await pool.query(sql, [userid]);
    response.status(200).send(query.rows[0]);
});

app.get("/status/history/:user", async (request, response) => {
    const userid = request.params.user;
    const sql = `
    SELECT status.value AS "status", created
    FROM status
    JOIN user_status ON status_id = status.id AND user_id = $1
    ORDER BY created DESC`;
    const query = await pool.query(sql, [userid]);
    response.status(200).send(query.rows);
});



app.listen("2700")