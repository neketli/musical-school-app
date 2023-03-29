DROP TABLE departaments CASCADE;
DROP TABLE groups CASCADE;
DROP TABLE journals CASCADE;
DROP TABLE speciality CASCADE;
DROP TABLE students CASCADE;
DROP TABLE subjects CASCADE;
DROP TABLE teachers CASCADE;
-- n:n
DROP TABLE students_groups CASCADE;
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

DROP TRIGGER classrooms_audit on classrooms CASCADE;
DROP TRIGGER departaments_audit on departaments CASCADE;
DROP TRIGGER groups_audit on groups CASCADE;
DROP TRIGGER journals_audit on journals CASCADE;
DROP TRIGGER plans_audit on plans CASCADE;
DROP TRIGGER speciality_audit on speciality CASCADE;
DROP TRIGGER students_audit on students CASCADE;
DROP TRIGGER subjects_audit on subjects CASCADE;
DROP TRIGGER teachers_audit on teachers CASCADE;
-- n:n
DROP TRIGGER students_groups_audit on students_groups CASCADE;
DROP TRIGGER subjects_plans_audit on subjects_plans CASCADE;
DROP TRIGGER subjects_teachers_audit on subjects_teachers CASCADE;

-- Старое
DROP TABLE plans CASCADE;
DROP TABLE subjects_plans CASCADE;
DROP TABLE classrooms CASCADE;