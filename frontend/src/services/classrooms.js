import axios from "axios";

class ClassroomsService {
  constructor() {
    this.classrooms = [];
    this.columns = [];
  }

  getColumns() {
    this.columns = [
      {
        label: "id",
        value: "id",
      },
      {
        label: "Номер",
        value: "number",
      },
      {
        label: "Тип",
        value: "type",
      },
      {
        label: "Отдел",
        value: "id_departament",
      },
    ];
    return this.columns;
  }

  async getClassrooms() {
    if (!this.classrooms.length) {
      const classrooms = await axios.get(
        `${import.meta.env.VITE_API_URL}/classrooms`
      );
      this.classrooms = classrooms.data;
    }
    return this.classrooms;
  }

  async addClassroom(classroom) {
    await axios.post(`${import.meta.env.VITE_API_URL}/classrooms`, classroom);
    this.classrooms.push(classroom);
    return classroom;
  }
  async editClassroom(classroom) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/classrooms/${classroom.id}`,
      classroom
    );
    this.classrooms = this.classrooms.map(
      (item) => (item = item.id === classroom.id ? classroom : item)
    );
    return classroom;
  }

  async removeClassroom(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/classrooms/${id}`);
    this.classrooms = this.classrooms.filter(
      (classroom) => classroom.id !== id
    );
  }
}

export default new ClassroomsService();
