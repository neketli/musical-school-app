import axios from "axios";

class StudentsService {
  constructor() {
    this.students = [];
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
        label: "Телефон",
        value: "phone",
      },
      {
        label: "Телефон родителей",
        value: "parents_phone",
      },
      {
        label: "Дата рождения",
        value: "birthdate",
      },
    ];
    return this.columns;
  }

  async getStudents() {
    if (!this.students.length) {
      const students = await axios.get(
        `${import.meta.env.VITE_API_URL}/students`
      );
      this.students = students.data;
    }
    return this.students;
  }

  async addStudent(student) {
    await axios.post(`${import.meta.env.VITE_API_URL}/students`, student);
    this.students.push(student);
    return student;
  }
  async editStudent(student) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/students/${student.id}`,
      student
    );
    this.students = this.students.map(
      (item) => (item = item.id === student.id ? student : item)
    );
    return student;
  }

  async removeStudent(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/students/${id}`);
    this.students = this.students.filter((student) => student.id !== id);
  }
}

export default new StudentsService();
