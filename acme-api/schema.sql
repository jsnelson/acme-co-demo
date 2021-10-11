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
    user_id INTEGER REFERENCES(users.id),
    status_id INTEGER REFERENCES(status.id),
    created TIMESTAMP DEFAULT now(),
    PRIMARY KEY (user_id, status_id, created)
);
