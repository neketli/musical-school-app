import axios from "axios";

class DepartamentsService {
  constructor() {
    this.departaments = [];
    this.columns = [];
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

  async getDepartaments() {
    if (!this.departaments.length) {
      const departaments = await axios.get(
        `${import.meta.env.VITE_API_URL}/departaments`
      );
      this.departaments = departaments.data;
    }
    return this.departaments;
  }

  async addDepartament(departament) {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/departaments`,
      departament
    );
    this.departaments.push(departament);
    return departament;
  }
  async editDepartament(departament) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/departaments/${departament.id}`,
      departament
    );
    this.departaments = this.departaments.map(
      (item) => (item = item.id === departament.id ? departament : item)
    );
    return departament;
  }

  async removeDepartament(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/departaments/${id}`);
    this.departaments = this.departaments.filter(
      (departament) => departament.id !== id
    );
  }
}

export default new DepartamentsService();
