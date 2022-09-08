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
        label: "Специальность",
        value: "id_speciality",
      },
    ];
    return this.columns;
  }

  async getSpecialitys() {
    if (!this.specialities.length) {
      const specialities = await axios.get(
        `${import.meta.env.VITE_API_URL}/speciality`
      );
      this.specialities = specialities.data;
    }
    return this.specialities;
  }

  async addSpeciality(speciality) {
    await axios.post(`${import.meta.env.VITE_API_URL}/speciality`, speciality);
    this.specialities.push(speciality);
    return speciality;
  }
  async editSpeciality(speciality) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/speciality/${speciality.id}`,
      speciality
    );
    this.specialities = this.specialities.map(
      (item) => (item = item.id === speciality.id ? speciality : item)
    );
    return speciality;
  }

  async removeSpeciality(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/speciality/${id}`);
    this.specialities = this.specialities.filter(
      (speciality) => speciality.id !== id
    );
  }
}

export default new SpecialitysService();
