CREATE DATABASE intuitivecare;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS operadoras_ans (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  registroAns VARCHAR NOT NULL
);

