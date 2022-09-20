import axios from "axios";

class TeachersService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Преподаватели";
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

  async updateData() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/teachers`
    );
    this.data = data;
  }

  async getData() {
    if (!this.data.length) {
      await this.updateData();
    }
    return this.data;
  }

  async addData(teacher) {
    const newTeacher = await axios.post(
      `${import.meta.env.VITE_API_URL}/teachers`,
      teacher
    );
    this.data.push(newTeacher.data);
    return newTeacher.data;
  }

  async editData(teacher) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/teachers/${teacher.id}`,
      teacher
    );
    this.data = this.data.map(
      (item) => (item = item.id === teacher.id ? teacher : item)
    );
    return teacher;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/teachers/${id}`);
    this.data = this.data.filter((teacher) => teacher.id !== id);
  }

  async revertData(value = {}) {
    await axios.post(`${import.meta.env.VITE_API_URL}/teachers/undo`, value);
    await this.updateData();
    return this.data;
  }
}

export default new TeachersService();
