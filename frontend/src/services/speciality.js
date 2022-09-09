import axios from "axios";

class SpecialitysService {
  constructor() {
    this.specialities = [];
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
      {
        label: "Основной инструмент",
        value: "instrument",
      },
      {
        label: "id отдела",
        value: "id_departament",
      },
    ];
    return this.columns;
  }

  async getData() {
    if (!this.specialities.length) {
      const specialities = await axios.get(
        `${import.meta.env.VITE_API_URL}/speciality`
      );
      this.specialities = specialities.data;
    }
    return this.specialities;
  }

  async addData(speciality) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/speciality`,
      speciality
    );
    this.specialities.push(response.data);
    return response.data;
  }

  async editData(speciality) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/speciality/${speciality.id}`,
      speciality
    );
    this.specialities = this.specialities.map(
      (item) => (item = item.id === speciality.id ? speciality : item)
    );
    return speciality;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/speciality/${id}`);
    this.specialities = this.specialities.filter(
      (speciality) => speciality.id !== id
    );
  }
}

export default new SpecialitysService();
