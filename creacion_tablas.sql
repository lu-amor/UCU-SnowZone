CREATE TABLE obligatorio.login (
    mail VARCHAR(255),
    password VARCHAR(30),
    rol ENUM('alumno', 'instructor', 'admin'),
    PRIMARY KEY (mail),
    CONSTRAINT email_valido CHECK (mail REGEXP '^[A-Za-z0-9._%+-]+@(ucu\\.edu\\.uy|correo\\.ucu\\.edu\\.uy)$')
);

CREATE TABLE obligatorio.actividades (
    id INT AUTO_INCREMENT,
    descripcion VARCHAR(300),
    costo INT,
    min_edad INT,
    PRIMARY KEY (id)
);

CREATE TABLE obligatorio.equipamiento (
    id INT AUTO_INCREMENT,
    id_actividad INT,
    descripcion VARCHAR(300),
    costo INT,
    cant_disponibles INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id_actividad) references actividades(id) ON DELETE set null
);

CREATE TABLE obligatorio.instructor (
    ci INT NOT NULL UNIQUE,
    nombre VARCHAR(40),
    apellido VARCHAR(40),
    f_nac DATE,
    mail VARCHAR(255),
    tel INT,
    CONSTRAINT tel_instructor_valido CHECK (tel REGEXP '^(\\+?598)?[0-9]{8,9}$'),
    CONSTRAINT email_instructor_valido CHECK (mail REGEXP '^[A-Za-z0-9._%+-]+@(ucu\\.edu\\.uy|correo\\.ucu\\.edu\\.uy)$'),
    PRIMARY KEY (ci)
);

CREATE TABLE obligatorio.alumno (
    ci INT NOT NULL UNIQUE,
    nombre VARCHAR(40),
    apellido VARCHAR(40),
    f_nac DATE,
    mail VARCHAR(255),
    tel INT,
    CONSTRAINT tel_alumno_valido CHECK (tel REGEXP '^(\\+?598)?[0-9]{8,9}$'),
    CONSTRAINT email_alumno_valido CHECK (mail REGEXP '^[A-Za-z0-9._%+-]+@(ucu\\.edu\\.uy|correo\\.ucu\\.edu\\.uy)$'),
    PRIMARY KEY (ci)
);

CREATE TABLE obligatorio.turno (
    id INT NOT NULL UNIQUE,
    hora_inicio TIME,
    hora_fin TIME,
    PRIMARY KEY (id)
);

CREATE TABLE obligatorio.clase (
    id INT AUTO_INCREMENT,
    ci_instructor INT NOT NULL,
    id_actividad INT NOT NULL,
    id_turno INT NOT NULL,
    dictada BOOL NOT NULL DEFAULT 0,
    grupal BOOL NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (ci_instructor) references instructor(ci) ON DELETE restrict,
    FOREIGN KEY (id_actividad) references actividades(id) ON DELETE cascade,
    FOREIGN KEY (id_turno) references turno(id) ON DELETE cascade
);

CREATE TABLE obligatorio.alumno_clase (
    id_clase INT NOT NULL,
    id_alumno INT NOT NULL,
    id_equipamiento INT,
    PRIMARY KEY (id_clase, id_alumno),
    FOREIGN KEY (id_clase) references clase(id) ON DELETE cascade,
    FOREIGN KEY (id_alumno) references alumno(ci) ON DELETE cascade,
    FOREIGN KEY (id_equipamiento) references equipamiento(id) ON DELETE set null
);