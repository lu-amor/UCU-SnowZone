CREATE DATABASE IF NOT EXISTS obligatorio;

USE obligatorio;

CREATE TABLE obligatorio.login (
    mail VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    rol ENUM('alumno', 'instructor', 'admin') NOT NULL,
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

CREATE TABLE obligatorio.equipamiento_kit (
    id INT AUTO_INCREMENT,
    id_actividad INT NOT NULL,
    descripcion VARCHAR(300),
    tamanio ENUM('XS', 'S', 'M','L','XL','XXL','XXXL') NOT NULL,
    costo INT,
    cant_disponibles INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id_actividad) REFERENCES actividades(id) ON DELETE CASCADE
);

CREATE TABLE obligatorio.instructor (
    ci INT NOT NULL UNIQUE,
    nombre VARCHAR(40),
    apellido VARCHAR(40),
    f_nac DATE,
    mail VARCHAR(255),
    tel VARCHAR(15) NOT NULL,
    CONSTRAINT check_numero_telefono CHECK (tel REGEXP '^\\+598[0-9]{8}$'),
    UNIQUE (tel),
    CONSTRAINT email_instructor_valido CHECK (mail REGEXP '^[A-Za-z0-9._%+-]+@(ucu\\.edu\\.uy|correo\\.ucu\\.edu\\.uy)$'),
    PRIMARY KEY (ci)
);

CREATE TABLE obligatorio.alumno (
    ci INT NOT NULL UNIQUE,
    nombre VARCHAR(40),
    apellido VARCHAR(40),
    f_nac DATE,
    mail VARCHAR(255),
    tel VARCHAR(15) NOT NULL,
    CONSTRAINT tel_valido CHECK (tel REGEXP '^\\+598[0-9]{8}$'),
    UNIQUE (tel),
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
    FOREIGN KEY (ci_instructor) REFERENCES instructor(ci) ON DELETE RESTRICT,
    FOREIGN KEY (id_actividad) REFERENCES actividades(id) ON DELETE CASCADE,
    FOREIGN KEY (id_turno) REFERENCES turno(id) ON DELETE CASCADE
);

CREATE TABLE obligatorio.alumno_clase (
    id_clase INT NOT NULL,
    id_alumno INT NOT NULL,
    id_kit INT,
    PRIMARY KEY (id_clase, id_alumno),
    FOREIGN KEY (id_clase) REFERENCES clase(id) ON DELETE CASCADE,
    FOREIGN KEY (id_alumno) REFERENCES alumno(ci) ON DELETE CASCADE,
    FOREIGN KEY (id_kit) REFERENCES equipamiento_kit(id) ON DELETE SET NULL
);

ALTER TABLE obligatorio.alumno_clase
ADD COLUMN costo_total INT;


USE obligatorio;


INSERT INTO obligatorio.login (mail, password, rol) VALUES
('admin@ucu.edu.uy','password', 'admin'),
('juan.perez@correo.ucu.edu.uy', 'password', 'alumno'),
('maria.garcia@ucu.edu.uy', 'password', 'instructor'),
('pedro.lopez@correo.ucu.edu.uy', 'password', 'alumno'),
('laura.martinez@correo.ucu.edu.uy', 'password', 'alumno'),
('carlos.sanchez@ucu.edu.uy', 'password', 'instructor'),
('sofia.fernandez@correo.ucu.edu.uy', 'password', 'alumno'),
('lucas.rivera@correo.ucu.edu.uy', 'password', 'alumno'),
('veronica.diaz@ucu.edu.uy', 'password', 'instructor'),
('roberto.gonzalez@ucu.edu.uy', 'password', 'instructor'),
('natalia.castro@correo.ucu.edu.uy', 'password', 'alumno'),
('gabriel.castro@correo.ucu.edu.uy', 'password', 'alumno'),
('ramiro.fernadez@correo.ucu.edu.uy', 'password', 'alumno'),
('maria.vazquez@correo.ucu.edu.uy', 'password', 'alumno'),
('alejandra.suarez@correo.ucu.edu.uy', 'password', 'alumno');



INSERT INTO obligatorio.actividades (descripcion, costo, min_edad) VALUES
('Snowboard', 500, 18),
('Ski', 300, 0),
('Moto de nieve', 400, 21);



INSERT INTO obligatorio.equipamiento_kit (id_actividad, descripcion, tamanio, costo, cant_disponibles) VALUES
(1, 'Kit de Snowboard', 'XS', 600, 5),
(1, 'Kit de Snowboard', 'S', 600, 5),
(1, 'Kit de Snowboard', 'M', 600, 5),
(1, 'Kit de Snowboard', 'L', 600, 5),
(1, 'Kit de Snowboard', 'XL', 600, 5),
(1, 'Kit de Snowboard', 'XXL', 600, 5),
(1, 'Kit de Snowboard', 'XXXL', 600, 5),

(2, 'Kit de Ski', 'XS', 500, 10),
(2, 'Kit de Ski', 'S', 500, 10),
(2, 'Kit de Ski', 'M', 500, 10),
(2, 'Kit de Ski', 'L', 500, 10),
(2, 'Kit de Ski', 'XL', 500, 10),
(2, 'Kit de Ski', 'XXL', 500, 10),
(2, 'Kit de Ski', 'XXXL', 500, 10),

(3, 'Kit de Moto de Nieve', 'XS', 700, 3),
(3, 'Kit de Moto de Nieve', 'S', 700, 3),
(3, 'Kit de Moto de Nieve', 'M', 700, 3),
(3, 'Kit de Moto de Nieve', 'L', 700, 3),
(3, 'Kit de Moto de Nieve', 'XL', 700, 3),
(3, 'Kit de Moto de Nieve', 'XXL', 700, 3),
(3, 'Kit de Moto de Nieve', 'XXXL', 700, 3);


INSERT INTO obligatorio.instructor (ci, nombre, apellido, f_nac, mail, tel) VALUES
(23456789, 'María', 'García', '1990-02-10', 'maria.garcia@ucu.edu.uy', '+59898765432'),
(56789012, 'Carlos', 'Sanchez', '1978-12-25', 'carlos.sanchez@ucu.edu.uy', '+59833445566'),
(89012345, 'Veronica', 'Diaz', '1987-09-01', 'veronica.diaz@ucu.edu.uy', '+59866778899'),
(90123456, 'Roberto', 'Gonzalez', '1994-06-30', 'roberto.gonzalez@ucu.edu.uy', '+59811223344');



INSERT INTO obligatorio.alumno (ci, nombre, apellido, f_nac, mail, tel) VALUES
(23456888, 'Juan', 'Perez', '2002-10-28', 'juan.perez@ucu.edu.uy', '+59898765432'),
(51234012, 'Pedro', 'Lopez', '1999-02-24', 'pedro.lopez@ucu.edu.uy', '+59896448566'),
(60001234, 'Laura', 'Martinez', '2004-07-13', 'laura.martinez@correo.ucu.edu.uy', '+59896758829'),
(51324420, 'Sofia', 'Fernandez', '2001-07-21', 'sofia.fernandez@correo.ucu.edu.uy', '+59899889911'),
(59981228, 'Lucas', 'Rivera', '2003-01-29', 'lucas.rivera@ucu.edu.uy', '+59899123911'),
(42998999, 'Natalia', 'Castro', '1998-12-12', 'natalia.castro@correo.ucu.edu.uy', '+59899209485'),
(56087865, 'Gabriel', 'Castro', '2000-11-02', 'gabriel.castro@correo.ucu.edu.uy', '+59894329093'),
(60091230, 'Maria', 'Vazquez', '2005-01-01', 'maria.vazquez@correo.ucu.edu.uy', '+59898882200'),
(48886577, 'Alejandra', 'Suarez', '1995-01-14', 'alejandra.suarez@correo.ucu.edu.uy', '+59899887654'),
(58789029, 'Ramiro', 'Fernandez', '1999-08-24', 'ramiro.fernadez@correo.ucu.edu.uy', '+59899325677');


INSERT INTO obligatorio.turno (id, hora_inicio, hora_fin) VALUES
(1, '09:00:00', '11:00:00'),
(2, '12:00:00', '14:00:00'),
(3, '16:00:00', '18:00:00');


INSERT INTO obligatorio.clase (ci_instructor, id_actividad, id_turno, dictada, grupal) VALUES
(23456789, 1, 1, 0, 1),
(56789012, 2, 2, 0, 1),
(89012345, 3, 3, 0, 0),
(23456789, 2, 1, 1, 1),
(90123456, 1, 2, 0, 1);

INSERT INTO obligatorio.alumno_clase (id_clase, id_alumno, id_kit, costo_total) VALUES
(1, 23456888, 1, 1100),
(1, 51234012, 2, 1100),
(2, 60001234, 8, 800),
(2, 51324420, 8,800),
(3, 42998999, 13, 1100),
(4, 58789029, 9, 800),
(5, 48886577, NULL, 500),
(1, 60001234, NULL, 500);


SELECT
    ci, nombre, apellido, f_nac,
    TIMESTAMPDIFF(YEAR, f_nac, CURDATE()) AS edad
FROM
    obligatorio.alumno;

use obligatorio;
CREATE TRIGGER verificar_edad_al_inscribirse
BEFORE INSERT ON alumno_clase
FOR EACH ROW
BEGIN
    DECLARE edad_alumno INT;
    DECLARE min_edad INT;

    SELECT TIMESTAMPDIFF(YEAR, f_nac, CURDATE()) INTO edad_alumno
    FROM alumno
    WHERE ci = NEW.id_alumno;

    SELECT min_edad INTO min_edad
    FROM actividades
    WHERE id = (SELECT id_actividad FROM clase WHERE id = NEW.id_clase);

    IF edad_alumno < min_edad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El alumno no cumple con la edad mínima para esta actividad';
    END IF;
END;


CREATE TABLE obligatorio.clase_dictada (
    id_clase INT NOT NULL ,
    fecha DATE NOT NULL,
    PRIMARY KEY (id_clase, fecha),
    FOREIGN KEY (id_clase) REFERENCES clase(id) ON DELETE CASCADE
);

CREATE TRIGGER after_update_clases_dictada
AFTER UPDATE ON clase
FOR EACH ROW
BEGIN
    IF NEW.dictada = TRUE AND OLD.dictada = FALSE THEN
        INSERT INTO clase_dictada (id_clase, fecha)
        VALUES (NEW.id, CURDATE());
    END IF;
END;

CREATE TRIGGER before_delete_clase
BEFORE DELETE ON clase
FOR EACH ROW
BEGIN
    UPDATE clase_dictada
    SET id_clase = -1
    WHERE id_clase = OLD.id;
END;