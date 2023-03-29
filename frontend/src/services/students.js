import axios from "axios";

class StudentsService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Ученики";
  }

  getColumns() {
    this.columns = [
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
    ];
    return this.columns;
  }

  async updateData() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/students`
    );
    this.data = data;
  }

  async getData() {
    if (!this.data.length) {
      await this.updateData();
    }
    return this.data;
  }

  async addData(student) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/students`,
      student
    );
    this.data.push(response.data);
    return response.data;
  }

  async editData(student) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/students/${student.id}`,
      student
    );
    this.data = this.data.map(
      (item) => (item = item.id === student.id ? student : item)
    );
    return student;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/students/${id}`);
    this.data = this.data.filter((student) => student.id !== id);
  }

  async revertData(value = {}) {
    await axios.post(`${import.meta.env.VITE_API_URL}/students/undo`, value);
    await this.updateData();
    return this.data;
  }
}

export default new StudentsService();
