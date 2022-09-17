import axios from "axios";

class GroupsService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Группы";
  }

  getColumns() {
    this.columns = [
      {
        label: "id",
        value: "id",
      },
      {
        label: "Форма обучения",
        value: "form",
      },
      {
        label: "Год обучения",
        value: "year",
      },
      {
        label: "id специальности",
        value: "id_speciality",
      },
    ];
    return this.columns;
  }

  async getData() {
    if (!this.data.length) {
      const groups = await axios.get(`${import.meta.env.VITE_API_URL}/groups`);
      this.data = groups.data;
    }
    return this.data;
  }

  async addData(group) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/groups`,
      group
    );
    this.data.push(response.data);
    return response.data;
  }

  async editData(group) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/groups/${group.id}`,
      group
    );
    this.data = this.data.map(
      (item) => (item = item.id === group.id ? group : item)
    );
    return group;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/groups/${id}`);
    this.data = this.data.filter((group) => group.id !== id);
  }
}

export default new GroupsService();
