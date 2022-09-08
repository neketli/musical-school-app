import axios from "axios";

class TeachersService {
  constructor() {
    this.teachers = [];
    this.columns = [];
  }

  getColumns() {
    this.columns = [
      {
        label: "id",
        value: "id",
      },
      {
        label: "Имя",
        value: "first_name",
      },
      {
        label: "Фамилия",
        value: "last_name",
      },
      {
        label: "Отчество",
        value: "patronymic",
      },
      {
        label: "Зарплата",
        value: "salary",
      },
      {
        label: "Должность",
        value: "position",
      },
      {
        label: "Телефон",
        value: "phone",
      },
      {
        label: "Дата рождения",
        value: "birthdate",
      },
    ];
    return this.columns;
  }

  async getTeachers() {
    if (!this.teachers.length) {
      const teachers = await axios.get(
        `${import.meta.env.VITE_API_URL}/teachers`
      );
      this.teachers = teachers.data;
    }
    return this.teachers;
  }

  async addTeacher(teacher) {
    await axios.post(`${import.meta.env.VITE_API_URL}/teachers`, teacher);
    this.teachers.push(teacher);
    return teacher;
  }
  async editTeacher(teacher) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/teachers/${teacher.id}`,
      teacher
    );
    this.teachers = this.teachers.map(
      (item) => (item = item.id === teacher.id ? teacher : item)
    );
    return teacher;
  }

  async removeTeacher(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/teachers/${id}`);
    this.teachers = this.teachers.filter((teacher) => teacher.id !== id);
  }
}

export default new TeachersService();
