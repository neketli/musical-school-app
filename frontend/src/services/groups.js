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
        label: "Специальность",
        value: "id_speciality",
      },
    ];
    return this.columns;
  }

  async getGroups() {
    if (!this.groups.length) {
      const groups = await axios.get(`${import.meta.env.VITE_API_URL}/groups`);
      this.groups = groups.data;
    }
    return this.groups;
  }

  async addGroup(group) {
    await axios.post(`${import.meta.env.VITE_API_URL}/groups`, group);
    this.groups.push(group);
    return group;
  }
  async editGroup(group) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/groups/${group.id}`,
      group
    );
    this.groups = this.groups.map(
      (item) => (item = item.id === group.id ? group : item)
    );
    return group;
  }

  async removeGroup(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/groups/${id}`);
    this.groups = this.groups.filter((group) => group.id !== id);
  }
}

export default new GroupsService();
