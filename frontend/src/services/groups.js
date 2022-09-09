import axios from "axios";

class GroupsService {
  constructor() {
    this.groups = [];
    this.columns = [];
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
    if (!this.groups.length) {
      const groups = await axios.get(`${import.meta.env.VITE_API_URL}/groups`);
      this.groups = groups.data;
    }
    return this.groups;
  }

  async addData(group) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/groups`,
      group
    );
    this.groups.push(response.data);
    return response.data;
  }

  async editData(group) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/groups/${group.id}`,
      group
    );
    this.groups = this.groups.map(
      (item) => (item = item.id === group.id ? group : item)
    );
    return group;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/groups/${id}`);
    this.groups = this.groups.filter((group) => group.id !== id);
  }
}

export default new GroupsService();
