DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS users;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS lists (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    list_name TEXT NOT NULL,
    list_url TEXT NOT NULL UNIQUE,
    created_by uuid NOT NULL REFERENCES users
        ON UPDATE CASCADE
        ON DELETE CASCADE
);