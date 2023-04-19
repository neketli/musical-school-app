export enum DefaultServiceType {
  departaments,
  groups,
  speciality,
  journals,
  vedomosti,
  students,
  subjects,
  teachers,
  students_groups,
  subjects_teachers,
}

export const DefaultServices = Object.freeze({
  [DefaultServiceType.departaments]: {
    label: "Отделения",
    url: "/departaments",
    columns: [
      {
        label: "Название",
        value: "title",
        type: "input",
      },
    ],
  },

  [DefaultServiceType.groups]: {
    label: "Группы",
    url: "/groups",
    columns: [
      {
        label: "Номер группы",
        value: "id",
      },
      {
        label: "Форма обучения",
        value: "form",
        type: "input",
      },
      {
        label: "Год обучения",
        value: "year",
        type: "input",
      },
      {
        label: "Специальность",
        value: "id_speciality",
        type: "select",
      },
    ],
  },

  [DefaultServiceType.speciality]: {
    label: "Специальности",
    url: "/speciality",
    columns: [
      {
        label: "Название",
        value: "title",
        type: "input",
      },
      {
        label: "Основной инструмент",
        value: "instrument",
        type: "input",
      },
      {
        label: "Отделение",
        value: "id_departament",
        type: "select",
      },
    ],
  },

  [DefaultServiceType.journals]: {
    label: "Журнал",
    url: "/journals",
    columns: [
      {
        label: "Тип оценки",
        value: "type",
        type: "input",
      },
      {
        label: "Дата выставления",
        value: "date",
        type: "date",
      },
      {
        label: "Оценка",
        value: "grade",
        type: "input",
      },
      {
        label: "id ученика",
        value: "id_student",
        type: "select",
      },
      {
        label: "id предмета",
        value: "id_subject",
        type: "select",
      },
    ],
  },

  [DefaultServiceType.vedomosti]: {
    label: "Журнал",
    url: "/journals",
    columns: [
      {
        label: "Тип оценки",
        value: "type",
        type: "input",
      },
      {
        label: "Дата выставления",
        value: "date",
        type: "input",
      },
      {
        label: "Оценка",
        value: "grade",
        type: "input",
      },
      {
        label: "id ученика",
        value: "id_student",
        type: "select",
      },
      {
        label: "id предмета",
        value: "id_subject",
        type: "select",
      },
    ],
  },

  [DefaultServiceType.students]: {
    label: "Ученики",
    url: "/students",
    columns: [
      {
        label: "Фамилия",
        value: "last_name",
        type: "input",
      },
      {
        label: "Имя",
        value: "first_name",
        type: "input",
      },
      {
        label: "Отчество",
        value: "patronymic",
        type: "input",
      },
      {
        label: "Телефон",
        value: "phone",
        type: "input",
      },
      {
        label: "Телефон родителей",
        value: "parents_phone",
        type: "input",
      },
      {
        label: "Дата рождения",
        value: "birthdate",
        type: "date",
      },
    ],
  },

  [DefaultServiceType.subjects]: {
    label: "Предметы",
    url: "/subjects",
    columns: [
      {
        label: "Название",
        value: "title",
        type: "input",
      },
    ],
  },

  [DefaultServiceType.teachers]: {
    label: "Преподаватели",
    url: "/teachers",
    columns: [
      {
        label: "Фамилия",
        value: "last_name",
        type: "input",
      },
      {
        label: "Имя",
        value: "first_name",
        type: "input",
      },
      {
        label: "Отчество",
        value: "patronymic",
        type: "input",
      },
      {
        label: "Зарплата",
        value: "salary",
        type: "input",
      },
      {
        label: "Должность",
        value: "position",
        type: "input",
      },
      {
        label: "Телефон",
        value: "phone",
        type: "input",
      },
      {
        label: "Дата рождения",
        value: "birthdate",
        type: "date",
      },
    ],
  },

  [DefaultServiceType.students_groups]: {
    label: "Список групп учеников",
    url: "/students_groups",
    columns: [
      {
        label: "Ученик",
        value: "id_student",
        type: "select",
      },
      {
        label: "Группа",
        value: "id_group",
        type: "select",
      },
    ],
  },

  [DefaultServiceType.subjects_teachers]: {
    label: "Список преподавателей и предметы которые они ведут",
    url: "/subjects_teachers",
    columns: [
      {
        label: "Предмет",
        value: "id_subject",
        type: "select",
      },
      {
        label: "Преподаватель",
        value: "id_teacher",
        type: "select",
      },
    ],
  },
});
