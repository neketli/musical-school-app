import axios from "axios";

class SGService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Список групп учеников";
  }

  getColumns() {
    this.columns = [
      {
        label: "Ученик",
        value: "id_student",
      },
      {
        label: "Группа",
        value: "id_group",
      },
    ];
    return this.columns;
  }

  async updateData() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/students_groups`
    );
    this.data = data;
  }

  async getData() {
    if (!this.data.length) {
      await this.updateData();
    }
    return this.data;
  }

  async addData(students_groups) {
    const newData = await axios.post(
      `${import.meta.env.VITE_API_URL}/students_groups`,
      students_groups
    );
    this.data.push(newData.data);
    return newData.data;
  }

  async editData(id, students_groups) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/students_groups/${id}`,
      students_groups
    );

    return students_groups;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/students_groups/${id}`);
    this.data = this.data.filter(
      (students_groups) => students_groups.id !== id
    );
  }

  async revertData(value = {}) {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/students_groups/undo`,
      value
    );
    await this.updateData();
    return this.data;
  }
}

export default new SGService();
