CREATE TABLE IF NOT EXISTS libros
(
    id     SERIAL PRIMARY KEY,
    titulo VARCHAR(50)  NOT NULL,
    autor  VARCHAR(50)  NOT NULL,
    anio   INT          NOT NULL
);