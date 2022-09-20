-- Create a new database called 'Musical_School'
-- CREATE DATABASE musical_school;

CREATE TABLE departaments (
    id SERIAL PRIMARY KEY,
    title character varying(50) NOT NULL
);

CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    number integer,
    year integer
);

CREATE TABLE classrooms (
    id SERIAL PRIMARY KEY,
    number int NOT NULL,
    type character varying(50) NOT NULL,
    id_departament bigint NOT NULL,
	FOREIGN KEY (id_departament) REFERENCES departaments (id) ON DELETE CASCADE
);

CREATE TABLE speciality (
    id SERIAL PRIMARY KEY,
    title character varying(50) NOT NULL,
    instrument character varying(40) NOT NULL,
    id_departament bigint NOT NULL,
	FOREIGN KEY (id_departament) REFERENCES departaments (id) ON DELETE CASCADE
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    form character varying(10) NOT NULL,
    year integer NOT NULL,
    id_speciality bigint NOT NULL,
	FOREIGN KEY (id_speciality) REFERENCES speciality (id) ON DELETE CASCADE
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    patronymic character varying(50) NOT NULL,
    phone character varying(20),
    parents_phone character varying(20) NOT NULL,
    birthdate date NOT NULL
);

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    patronymic character varying(50),
    salary integer,
    position character varying(50) NOT NULL,
    phone character varying(20) NOT NULL,
	birthdate date NOT NULL
);

CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    title character varying(50) NOT NULL
);

CREATE TABLE journals (
    id SERIAL PRIMARY KEY,
    type character varying(50) NOT NULL,
    date date NOT NULL,
    grade smallint NOT NULL,
    id_student bigint NOT NULL,
    id_subject bigint NOT NULL,
	FOREIGN KEY (id_student) REFERENCES students (id) ON DELETE CASCADE,
	FOREIGN KEY (id_subject) REFERENCES subjects (id) ON DELETE CASCADE
);

CREATE TABLE students_groups (
    id SERIAL PRIMARY KEY,
    id_student bigint NOT NULL,
    id_group bigint NOT NULL,
	FOREIGN KEY (id_student) REFERENCES students (id) ON DELETE CASCADE,
	FOREIGN KEY (id_group) REFERENCES groups (id) ON DELETE CASCADE
);

CREATE TABLE subjects_plans (
    id SERIAL PRIMARY KEY,
    id_subject bigint NOT NULL,
    id_plan bigint NOT NULL,
	FOREIGN KEY (id_subject) REFERENCES subjects (id) ON DELETE CASCADE,
	FOREIGN KEY (id_plan) REFERENCES plans (id) ON DELETE CASCADE
);

CREATE TABLE subjects_teachers (
    id SERIAL PRIMARY KEY,
    id_subject bigint NOT NULL,
    id_teacher bigint NOT NULL,
	FOREIGN KEY (id_subject) REFERENCES subjects (id) ON DELETE CASCADE,
	FOREIGN KEY (id_teacher) REFERENCES teachers (id) ON DELETE CASCADE
);




-- TEMP TABLES

CREATE TABLE temp_departaments (
    id bigint NOT NULL,
    title character varying(50) NOT NULL,

    operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);

CREATE TABLE temp_plans (
    id bigint NOT NULL,
    number integer,
    year integer,

    operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);


CREATE TABLE temp_classrooms (
    id bigint NOT NULL,
    number int NOT NULL,
    type character varying(50) NOT NULL,
    id_departament bigint NOT NULL,
    
	operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);

CREATE TABLE temp_speciality (
    id bigint NOT NULL,
    title character varying(50) NOT NULL,
    instrument character varying(40) NOT NULL,
    id_departament bigint NOT NULL,

    operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);

CREATE TABLE temp_groups (
    id bigint NOT NULL,
    form character varying(10) NOT NULL,
    year integer NOT NULL,
    id_speciality bigint NOT NULL,

    operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);

CREATE TABLE temp_students (
    id bigint NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    patronymic character varying(50) NOT NULL,
    phone character varying(20),
    parents_phone character varying(20) NOT NULL,
	birthdate date NOT NULL,

    operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);

CREATE TABLE temp_teachers (
    id bigint NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    patronymic character varying(50),
    salary integer,
    position character varying(50) NOT NULL,
    phone character varying(20) NOT NULL,
	birthdate date NOT NULL, 

    operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);

CREATE TABLE temp_subjects (
    id bigint NOT NULL,
    title character varying(50) NOT NULL,

    operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);

CREATE TABLE temp_journals (
    id bigint NOT NULL,
    type character varying(50) NOT NULL,
    date date NOT NULL,
    grade smallint NOT NULL,
    id_student bigint NOT NULL,
    id_subject bigint NOT NULL,

    operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
	
);

CREATE TABLE temp_students_groups (
    id bigint NOT NULL,
    id_student bigint NOT NULL,
    id_group bigint NOT NULL,

	operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);



CREATE TABLE temp_subjects_plans (
    id bigint NOT NULL,
	id_subject bigint NOT NULL,
    id_plan bigint NOT NULL,

    operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);

CREATE TABLE temp_subjects_teachers (
    id bigint NOT NULL,
    id_subject bigint NOT NULL,
    id_teacher bigint NOT NULL,

	operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);

-- USERS

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    role character varying(20) NOT NULL,
		rid character varying(10)
);

CREATE TABLE temp_users (
    id bigint NOT NULL,
    login character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    role character varying(20) NOT NULL,
	rid character varying(10),
	
	operation         char(6)   NOT NULL,
    stamp             timestamp NOT NULL,
	op_id SERIAL PRIMARY KEY
);



-- TRIGGERS 

CREATE OR REPLACE FUNCTION departaments_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_departaments
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_departaments
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_departaments
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER departaments_audit AFTER INSERT OR UPDATE OR DELETE 
ON departaments for EACH ROW EXECUTE 
PROCEDURE departaments_audit_function();

CREATE OR REPLACE FUNCTION plans_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_plans
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_plans
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_plans
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER plans_audit AFTER INSERT OR UPDATE OR DELETE 
ON plans for EACH ROW EXECUTE 
PROCEDURE plans_audit_function();


CREATE OR REPLACE FUNCTION classrooms_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_classrooms
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_classrooms
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_classrooms
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER classrooms_audit AFTER INSERT OR UPDATE OR DELETE 
ON classrooms for EACH ROW EXECUTE 
PROCEDURE classrooms_audit_function();


CREATE OR REPLACE FUNCTION speciality_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_speciality
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_speciality
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_speciality
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER speciality_audit AFTER INSERT OR UPDATE OR DELETE 
ON speciality for EACH ROW EXECUTE 
PROCEDURE speciality_audit_function();


CREATE OR REPLACE FUNCTION groups_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_groups
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_groups
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_groups
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER groups_audit AFTER INSERT OR UPDATE OR DELETE 
ON groups for EACH ROW EXECUTE 
PROCEDURE groups_audit_function();


CREATE OR REPLACE FUNCTION students_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_students
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_students
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_students
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER students_audit AFTER INSERT OR UPDATE OR DELETE 
ON students for EACH ROW EXECUTE 
PROCEDURE students_audit_function();


CREATE OR REPLACE FUNCTION teachers_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_teachers
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_teachers
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_teachers
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER teachers_audit AFTER INSERT OR UPDATE OR DELETE 
ON teachers for EACH ROW EXECUTE 
PROCEDURE teachers_audit_function();


CREATE OR REPLACE FUNCTION subjects_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_subjects
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_subjects
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_subjects
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER subjects_audit AFTER INSERT OR UPDATE OR DELETE 
ON subjects for EACH ROW EXECUTE 
PROCEDURE subjects_audit_function();


CREATE OR REPLACE FUNCTION journals_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_journals
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_journals
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_journals
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER journals_audit AFTER INSERT OR UPDATE OR DELETE 
ON journals for EACH ROW EXECUTE 
PROCEDURE journals_audit_function();


CREATE OR REPLACE FUNCTION students_groups_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_students_groups
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_students_groups
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_students_groups
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER students_groups_audit AFTER INSERT OR UPDATE OR DELETE 
ON students_groups for EACH ROW EXECUTE 
PROCEDURE students_groups_audit_function();


CREATE OR REPLACE FUNCTION subjects_plans_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_subjects_plans
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_subjects_plans
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_subjects_plans
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER subjects_plans_audit AFTER INSERT OR UPDATE OR DELETE 
ON subjects_plans for EACH ROW EXECUTE 
PROCEDURE subjects_plans_audit_function();


CREATE OR REPLACE FUNCTION subjects_teachers_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_subjects_teachers
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_subjects_teachers
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_subjects_teachers
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER subjects_teachers_audit AFTER INSERT OR UPDATE OR DELETE 
ON subjects_teachers for EACH ROW EXECUTE 
PROCEDURE subjects_teachers_audit_function();


CREATE OR REPLACE FUNCTION users_audit_function() RETURNS TRIGGER AS $$
	BEGIN
		IF TG_OP = 'INSERT' THEN
			INSERT INTO temp_users
			SELECT NEW.*, 'INSERT', now();
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO temp_users
			SELECT OLD.*, 'UPDATE', now();
		ELSIF TG_OP = 'DELETE' THEN
			INSERT INTO temp_users
			SELECT OLD.*,'DELETE',now();
		END IF;
		RETURN NULL;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_audit AFTER INSERT OR UPDATE OR DELETE 
ON users for EACH ROW EXECUTE 
PROCEDURE users_audit_function();

