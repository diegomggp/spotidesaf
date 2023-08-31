CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL,
    email TEXT NOR NULL UNIQUE,
    password TEXT NOT NULL,
)

