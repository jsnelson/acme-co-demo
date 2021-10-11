CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    name TEXT,
    email TEXT
);

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    value TEXT
);

INSERT INTO status (value)
VALUES 
('Working from home'),
('Working from office'),
('Working from lab');

CREATE TABLE user_status (
    user_id INTEGER REFERENCES users(id),
    status_id INTEGER REFERENCES status(id),
    created TIMESTAMP DEFAULT now(),
    PRIMARY KEY (user_id, status_id, created)
);

CREATE OR REPLACE FUNCTION make_password(pw TEXT) RETURNS TEXT
AS $$
BEGIN
    RETURN crypt(pw, gen_salt('bf'));
END;
$$
LANGUAGE plpgsql
COST 10;

CREATE OR REPLACE FUNCTION check_password(user_id INTEGER, pw TEXT) RETURNS BOOLEAN
AS $$
DECLARE
    current_pw TEXT;
    new_pw TEXT;
BEGIN
    SELECT password
    FROM users
    WHERE users.id = user_id
    INTO current_pw;

    SELECT crypt(pw, gen_salt('bf')) INTO new_pw;

    RETURN current_pw = new_pw;
END;
$$
LANGUAGE plpgsql
COST 50;

