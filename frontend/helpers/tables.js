export const TABLES = [
  {
    value: "users",
    label: "Пользователи",
    icon: "mdi:account-circle-outline",
    editAccess: ["admin"],
  },
  {
    value: "departaments",
    label: "Отделения",
    icon: "mdi:bookshelf",
    editAccess: ["admin", "director"],
    readAccess: ["teacher"],
  },
  {
    value: "speciality",
    label: "Специальности",
    icon: "mdi:school",
    editAccess: ["admin", "director"],
    readAccess: ["teacher", "student"],
  },
  {
    value: "subjects",
    label: "Предметы",
    icon: "mdi:bookmark-box-outline",
    editAccess: ["admin", "director"],
    readAccess: ["teacher"],
  },
  {
    value: "groups",
    label: "Группы",
    icon: "mdi:account-group",
    editAccess: ["admin", "director"],
    readAccess: ["teacher"],

    supLabel: "Списки учеников",
    subValue: "students_groups",
  },
  {
    value: "journals",
    label: "Журналы",
    icon: "mdi:book-open-page-variant-outline",
    editAccess: [],
  },
  {
    value: "vedomosti",
    label: "Ведомости",
    icon: "mdi:book-open-page-variant-outline",
    link: "/vedomosti",
    editAccess: ["admin", "director", "teacher"],
  },
  {
    value: "students",
    label: "Ученики",
    icon: "mdi:account",
    editAccess: ["admin", "director"],
    readAccess: ["teacher"],
  },
  {
    value: "teachers",
    label: "Преподаватели",
    icon: "mdi:account-outline",
    editAccess: ["admin", "director"],
    readAccess: [],

    supLabel: "Ответственные",
    subValue: "subjects_teachers",
  },
  {
    value: "teachers",
    label: "Преподаватели",
    icon: "mdi:account-outline",
    editAccess: [],
    readAccess: ["teacher", "student"],
  },

  {
    value: "student_journal",
    label: "Мои оценки",
    icon: "mdi:book-account-outline",
    link: "/diary",
    readAccess: ["student"],
  },
];
