import axios from "axios";

class STService {
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

  async getData() {
    if (!this.subjects_teachers.length) {
      const subjects_teachers = await axios.get(
        `${import.meta.env.VITE_API_URL}/subjects_teachers`
      );
      this.subjects_teachers = subjects_teachers.data;
    }
    return this.subjects_teachers;
  }

  async addData(subjects_teachers) {
    const newData = await axios.post(
      `${import.meta.env.VITE_API_URL}/subjects_teachers`,
      subjects_teachers
    );
    this.subjects_teachers.push(newData.data);
    return newData.data;
  }

  async editData(subjects_teachers) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/subjects_teachers/${subjects_teachers.id}`,
      subjects_teachers
    );
    this.subjects_teachers = this.subjects_teachers.map(
      (item) => (item = item.id === subjects_teachers.id ? subjects_teachers : item)
    );
    return subjects_teachers;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/subjects_teachers/${id}`);
    this.subjects_teachers = this.subjects_teachers.filter((subjects_teachers) => subjects_teachers.id !== id);
  }
}

export default new STService();
