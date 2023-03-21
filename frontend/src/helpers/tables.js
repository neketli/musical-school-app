export const TABLES = [
    {
      value: "users",
      label: "Пользователи",
      icon: "fa-user-circle-o",
      editAccess: ["admin"],
    },
    {
      value: "departaments",
      label: "Отделения",
      icon: "fa-archive",
      editAccess: ["admin", "director"],
      readAccess: ["teacher"],
    },
    {
      value: "speciality",
      label: "Специальности",
      icon: "fa-graduation-cap",
      editAccess: ["admin", "director"],
      readAccess: ["teacher", "student"],
    },
    {
      value: "subjects",
      label: "Предметы",
      icon: "fa-bookmark-o",
      editAccess: ["admin", "director"],
      readAccess: ["teacher"],
    },
    {
      value: "groups",
      label: "Группы",
      icon: "fa-users",
      editAccess: ["admin", "director"],
      readAccess: ["teacher"],
  
      supLabel: "Списки учеников",
      subValue: "students_groups",
    },
    {
      value: "journals",
      label: "Журналы",
      icon: "fa-book",
      editAccess: [],
    },
    {
      value: "vedomosti",
      label: "Ведомости",
      icon: "fa-book",
      link: "/vedomosti",
      editAccess: ["admin", "director", "teacher"],
    },
    {
      value: "students",
      label: "Ученики",
      icon: "fa-user",
      editAccess: ["admin", "director"],
      readAccess: ["teacher"],
    },
    {
      value: "teachers",
      label: "Преподаватели",
      icon: "fa-user-o",
      editAccess: ["admin", "director"],
      readAccess: [],
  
      supLabel: "Ответсвенные",
      subValue: "subjects_teachers",
    },
    {
      value: "teachers",
      label: "Преподаватели",
      icon: "fa-user-o",
      editAccess: [],
      readAccess: ["teacher", "student"],
    },
  
    {
      value: "student_journal",
      label: "Мои оценки",
      icon: "fa-book",
      link: "/dnevnik",
      readAccess: ["student"],
    },
  ];