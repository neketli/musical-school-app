import axios from "axios";

class ClassroomsService {
  constructor() {
    this.data = [];
    this.columns = [
      {
        label: "Номер",
        value: "number",
      },
      {
        label: "Тип",
        value: "type",
      },
      {
        label: "id отделения",
        value: "id_departament",
      },
    ];
    this.label = "Кабинеты";
  }

  getColumns() {
    return this.columns;
  }

  async updateData() {
    const classrooms = await axios.get(
      `${import.meta.env.VITE_API_URL}/classrooms`
    );
    this.data = classrooms.data;
  }

  async getData() {
    if (!this.data.length) {
      await this.updateData();
    }
    return this.data;
  }

  async addData(classroom) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/classrooms`,
      classroom
    );
    this.data.push(response.data);
    return response.data;
  }

  async editData(classroom) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/classrooms/${classroom.id}`,
      classroom
    );
    this.data = this.data.map(
      (item) => (item = item.id === classroom.id ? classroom : item)
    );
    return classroom;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/classrooms/${id}`);
    this.data = this.data.filter((classroom) => classroom.id !== id);
  }

  async revertData(value = {}) {
    await axios.post(`${import.meta.env.VITE_API_URL}/classrooms/undo`, value);
    await this.updateData();
    return this.data;
  }
}

export default new ClassroomsService();
