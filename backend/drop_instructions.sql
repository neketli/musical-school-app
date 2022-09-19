DROP TABLE classrooms CASCADE;
DROP TABLE departaments CASCADE;
DROP TABLE groups CASCADE;
DROP TABLE journals CASCADE;
DROP TABLE plans CASCADE;
DROP TABLE speciality CASCADE;
DROP TABLE students CASCADE;
DROP TABLE subjects CASCADE;
DROP TABLE teachers CASCADE;
-- n:n
DROP TABLE students_groups CASCADE;
DROP TABLE subjects_plans CASCADE;
DROP TABLE subjects_teachers CASCADE;

DROP TABLE temp_classrooms CASCADE;
DROP TABLE temp_departaments CASCADE;
DROP TABLE temp_groups CASCADE;
DROP TABLE temp_journals CASCADE;
DROP TABLE temp_plans CASCADE;
DROP TABLE temp_speciality CASCADE;
DROP TABLE temp_students CASCADE;
DROP TABLE temp_students_groups CASCADE;
DROP TABLE temp_subjects CASCADE;
DROP TABLE temp_subjects_plans CASCADE;
DROP TABLE temp_subjects_teachers CASCADE;
DROP TABLE temp_teachers CASCADE;
drop table temp_users cascade;