import axios from "axios";

class SGService {
  constructor() {
    this.data = [];
    this.columns = [];
  }

  getColumns() {
    this.columns = [
      {
        label: "id",
        value: "id",
      },
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

  async getData() {
    if (!this.students_groups.length) {
      const students_groups = await axios.get(
        `${import.meta.env.VITE_API_URL}/students_groups`
      );
      this.students_groups = students_groups.data;
    }
    return this.students_groups;
  }

  async addData(students_groups) {
    const newData = await axios.post(
      `${import.meta.env.VITE_API_URL}/students_groups`,
      students_groups
    );
    this.students_groups.push(newData.data);
    return newData.data;
  }

  async editData(students_groups) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/students_groups/${students_groups.id}`,
      students_groups
    );
    this.students_groups = this.students_groups.map(
      (item) => (item = item.id === students_groups.id ? students_groups : item)
    );
    return students_groups;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/students_groups/${id}`);
    this.students_groups = this.students_groups.filter((students_groups) => students_groups.id !== id);
  }
}

export default new SGService();
