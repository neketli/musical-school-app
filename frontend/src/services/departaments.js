import axios from "axios";

class DepartamentsService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Отделения";
  }

  getColumns() {
    this.columns = [
      {
        label: "id",
        value: "id",
      },
      {
        label: "Название",
        value: "title",
      },
    ];
    return this.columns;
  }

  async getData() {
    if (!this.data.length) {
      const departaments = await axios.get(
        `${import.meta.env.VITE_API_URL}/departaments`
      );
      this.data = departaments.data;
    }
    return this.data;
  }

  async addData(departaments) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/departaments`,
      departaments
    );
    this.data.push(response.data);
    return response.data;
  }

  async editData(departament) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/departaments/${departament.id}`,
      departament
    );
    this.data = this.data.map(
      (item) => (item = item.id === departament.id ? departament : item)
    );
    return departament;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/departaments/${id}`);
    this.data = this.data.filter((departament) => departament.id !== id);
  }
}

export default new DepartamentsService();
