-- Create a new database called 'Musical_School'
CREATE DATABASE Musical_School;

CREATE FUNCTION build_temp_classrooms() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_classrooms
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_classrooms
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_classrooms
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;

CREATE FUNCTION build_temp_departaments() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_departaments
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_departaments
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_departaments
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;

CREATE FUNCTION build_temp_groups() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_groups
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_groups
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_groups
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;

CREATE FUNCTION build_temp_journals() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_journals
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_journals
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_journals
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;



CREATE FUNCTION build_temp_plans() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_plans
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_plans
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_plans
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;



CREATE FUNCTION build_temp_speciality() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_speciality
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_speciality
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_speciality
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;



CREATE FUNCTION build_temp_students() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_students
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_students
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_students
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;


CREATE FUNCTION build_temp_studentsgroups() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_students_groups
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_students_groups
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_students_groups
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;



CREATE FUNCTION build_temp_subjects() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_subjects
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_subjects
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_subjects
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;


CREATE FUNCTION build_temp_subjects_plans() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_subjects_plans
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_students_groups
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_subjects_plans
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;

CREATE FUNCTION build_temp_subjects_teachers() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_subjects_teachers
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_students_teachers
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_subjects_teachers
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;

CREATE FUNCTION build_temp_teachers() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_teachers
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_teachers
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_teachers
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;

CREATE FUNCTION build_temp_users() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO temp_users
		SELECT nt.*, 'INSERT', now() FROM new_table nt;

	ELSEIF TG_OP = 'UPDATE' THEN
		INSERT INTO temp_users
		SELECT nt.*, 'UPDATE', now() FROM new_table nt; 

	ELSEIF TG_OP = 'DELETE' THEN
		INSERT INTO temp_users
		SELECT ot.*,'DELETE',now() FROM old_table ot;
		
	END IF;
	RETURN NULL;
END;
$$;

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
    number smallint NOT NULL,
    type character varying(50) NOT NULL,
    id_departament bigint NOT NULL,
	FOREIGN KEY (id_departament) REFERENCES departaments (id)
);

CREATE TABLE speciality (
    id SERIAL PRIMARY KEY,
    title character varying(50) NOT NULL,
    instrument character varying(40) NOT NULL,
    id_departament bigint NOT NULL,
	FOREIGN KEY (id_departament) REFERENCES departaments (id)
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    form character varying(10) NOT NULL,
    year integer NOT NULL,
    id_speciality bigint NOT NULL,
	FOREIGN KEY (id_speciality) REFERENCES speciality (id)
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
	FOREIGN KEY (id_student) REFERENCES students (id),
	FOREIGN KEY (id_subject) REFERENCES subjects (id)
);

CREATE TABLE students_groups (
    id_student bigint NOT NULL,
    id_group bigint NOT NULL,
	FOREIGN KEY (id_student) REFERENCES students (id),
	FOREIGN KEY (id_group) REFERENCES groups (id)
);

CREATE TABLE subjects_plans (
    id_subject bigint NOT NULL,
    id_plan bigint NOT NULL,
	FOREIGN KEY (id_subject) REFERENCES subjects (id),
	FOREIGN KEY (id_plan) REFERENCES plans (id)
);

CREATE TABLE subjects_teachers (
    id_subject bigint NOT NULL,
    id_teacher bigint NOT NULL,
	FOREIGN KEY (id_subject) REFERENCES subjects (id),
	FOREIGN KEY (id_teacher) REFERENCES teachers (id)
);

CREATE TABLE temp_classrooms (
    id bigint NOT NULL,
    id_departament bigint NOT NULL,
    number smallint NOT NULL,
    type character varying(50) NOT NULL,
    id_entry SERIAL PRIMARY KEY
);

CREATE TABLE temp_departaments (
    id bigint NOT NULL,
    title character varying(50) NOT NULL,
    id_entry SERIAL PRIMARY KEY
	
);

CREATE TABLE temp_groups (
    id bigint NOT NULL,
    id_speciality bigint NOT NULL,
    form bit varying(10) NOT NULL,
    year integer NOT NULL,
    id_entry SERIAL PRIMARY KEY
	
);

CREATE TABLE temp_journals (
    id bigint NOT NULL,
    id_student bigint NOT NULL,
    grade smallint NOT NULL,
    date date NOT NULL,
    type character varying(50) NOT NULL,
    id_subject bigint NOT NULL,
    id_entry SERIAL PRIMARY KEY
	
);

CREATE TABLE temp_plans (
    id bigint NOT NULL,
    number integer,
    year integer,
    id_entry SERIAL PRIMARY KEY
	
);


CREATE TABLE temp_speciality (
    id bigint NOT NULL,
    title character varying(50) NOT NULL,
    id_departament bigint NOT NULL,
    instrument character varying(40) NOT NULL,
    id_entry SERIAL PRIMARY KEY
	
);

CREATE TABLE temp_students (
    id bigint NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    patronymic character varying(50) NOT NULL,
    phone character varying(20),
    parents_phone character varying(20) NOT NULL,
	birthdate date NOT NULL,
    id_entry SERIAL PRIMARY KEY
	
);

CREATE TABLE temp_students_groups (
	id SERIAL PRIMARY KEY,
    id_student bigint NOT NULL,
    id_group bigint NOT NULL
);

CREATE TABLE temp_subjects (
    id bigint NOT NULL,
    title character varying(50) NOT NULL,
    id_entry SERIAL PRIMARY KEY
	
);

CREATE TABLE temp_subjects_plans (
    id_subject bigint NOT NULL,
    id_plan bigint NOT NULL,
    id SERIAL PRIMARY KEY
);

CREATE TABLE temp_subjects_teachers (
    id SERIAL PRIMARY KEY,
    id_subject bigint NOT NULL,
    id_teacher bigint NOT NULL
);

CREATE TABLE temp_teachers (
    id bigint NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    patronymic character varying(50),
    salary bigint,
    position character varying(50) NOT NULL,
	birthdate date NOT NULL, 
    phone character varying(20) NOT NULL,
    id_entry SERIAL PRIMARY KEY
	
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    user_group character varying(20) NOT NULL
);

CREATE TRIGGER temp_classrooms_delete AFTER DELETE ON classrooms REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_classrooms();

CREATE TRIGGER temp_classrooms_insert AFTER INSERT ON classrooms REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_classrooms();

CREATE TRIGGER temp_classrooms_update AFTER UPDATE ON classrooms REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_classrooms();

CREATE TRIGGER temp_departaments_delete AFTER DELETE ON departaments REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_departaments();

CREATE TRIGGER temp_departaments_insert AFTER INSERT ON departaments REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_departaments();


CREATE TRIGGER temp_departaments_update AFTER UPDATE ON departaments REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_departaments();


CREATE TRIGGER temp_groups_delete AFTER DELETE ON groups REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_groups();


CREATE TRIGGER temp_groups_insert AFTER INSERT ON groups REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_groups();


CREATE TRIGGER temp_groups_update AFTER UPDATE ON groups REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_groups();



CREATE TRIGGER temp_journals_delete AFTER DELETE ON journals REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_journals();


CREATE TRIGGER temp_journals_insert AFTER INSERT ON journals REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_journals();



CREATE TRIGGER temp_journals_update AFTER UPDATE ON journals REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_journals();



CREATE TRIGGER temp_plans_delete AFTER DELETE ON plans REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_plans();


CREATE TRIGGER temp_plans_insert AFTER INSERT ON plans REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_plans();



CREATE TRIGGER temp_plans_update AFTER UPDATE ON plans REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_plans();


CREATE TRIGGER temp_speciality_delete AFTER DELETE ON speciality REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_speciality();


CREATE TRIGGER temp_speciality_insert AFTER INSERT ON speciality REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_speciality();


CREATE TRIGGER temp_speciality_update AFTER UPDATE ON speciality REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_speciality();


CREATE TRIGGER temp_students_delete AFTER DELETE ON students REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_students();


CREATE TRIGGER temp_students_insert AFTER INSERT ON students REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_students();


CREATE TRIGGER temp_students_update AFTER UPDATE ON students REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_students();

CREATE TRIGGER temp_studentsgroup BEFORE INSERT OR UPDATE ON students_groups FOR EACH ROW EXECUTE FUNCTION build_temp_studentsgroups();


CREATE TRIGGER temp_subjects_plans BEFORE INSERT OR UPDATE ON subjects_plans FOR EACH ROW EXECUTE FUNCTION build_temp_subjects_plans();


CREATE TRIGGER temp_subjects_teachers BEFORE INSERT OR UPDATE ON subjects_teachers FOR EACH ROW EXECUTE FUNCTION build_temp_subjects_teachers();


CREATE TRIGGER temp_teachers_delete AFTER DELETE ON teachers REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_teachers();


CREATE TRIGGER temp_teachers_insert AFTER INSERT ON teachers REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_teachers();


CREATE TRIGGER temp_teachers_update AFTER UPDATE ON teachers REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_teachers();


CREATE TRIGGER temp_users_delete AFTER DELETE ON users REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_users();


CREATE TRIGGER temp_users_insert AFTER INSERT ON users REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_users();


CREATE TRIGGER temp_users_update AFTER UPDATE ON users REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT EXECUTE FUNCTION build_temp_users();
