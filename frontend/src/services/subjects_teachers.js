import axios from "axios";

class STService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Список преподавателей и предметы которые они ведут.";
  }

  getColumns() {
    this.columns = [
      {
        label: "id",
        value: "id",
      },
      {
        label: "Преподаватель",
        value: "id_teacher",
      },
      {
        label: "Предмет",
        value: "id_subject",
      },
    ];
    return this.columns;
  }

  async updateData() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/subjects_teachers`
    );
    this.data = data;
  }

  async getData() {
    if (!this.data.length) {
      await this.updateData();
    }
    return this.data;
  }

  async addData(subjects_teachers) {
    const newData = await axios.post(
      `${import.meta.env.VITE_API_URL}/subjects_teachers`,
      subjects_teachers
    );
    this.data.push(newData.data);
    return newData.data;
  }

  async editData(subjects_teachers) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/subjects_teachers/${
        subjects_teachers.id
      }`,
      subjects_teachers
    );
    this.data = this.data.map(
      (item) =>
        (item = item.id === subjects_teachers.id ? subjects_teachers : item)
    );
    return subjects_teachers;
  }

  async removeData(id) {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/subjects_teachers/${id}`
    );
    this.data = this.data.filter(
      (subjects_teachers) => subjects_teachers.id !== id
    );
  }

  async revertData(value = {}) {
    await axios.post(`${import.meta.env.VITE_API_URL}/subjects_teachers/undo`, value);
    await this.updateData();
    return this.data;
  }
}

export default new STService();
