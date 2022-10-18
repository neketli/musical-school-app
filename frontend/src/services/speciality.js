import axios from "axios";

class SpecialitysService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Специальности";
  }

  getColumns() {
    this.columns = [
      {
        label: "Название",
        value: "title",
      },
      {
        label: "Основной инструмент",
        value: "instrument",
      },
      {
        label: "Отделение",
        value: "id_departament",
      },
    ];
    return this.columns;
  }

  async updateData() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/speciality`
    );
    this.data = data;
  }

  async getData() {
    if (!this.data.length) {
      await this.updateData();
    }
    return this.data;
  }

  async addData(speciality) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/speciality`,
      speciality
    );
    this.data.push(response.data);
    return response.data;
  }

  async editData(speciality) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/speciality/${speciality.id}`,
      speciality
    );
    this.data = this.data.map(
      (item) => (item = item.id === speciality.id ? speciality : item)
    );
    return speciality;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/speciality/${id}`);
    this.data = this.data.filter((speciality) => speciality.id !== id);
  }

  async revertData(value = {}) {
    await axios.post(`${import.meta.env.VITE_API_URL}/speciality/undo`, value);
    await this.updateData();
    return this.data;
  }
}

export default new SpecialitysService();
