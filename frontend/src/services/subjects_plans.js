import axios from "axios";

class SPService {
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
    if (!this.subjects_plans.length) {
      const subjects_plans = await axios.get(
        `${import.meta.env.VITE_API_URL}/subjects_plans`
      );
      this.subjects_plans = subjects_plans.data;
    }
    return this.subjects_plans;
  }

  async addData(subjects_plans) {
    const newData = await axios.post(
      `${import.meta.env.VITE_API_URL}/subjects_plans`,
      subjects_plans
    );
    this.subjects_plans.push(newData.data);
    return newData.data;
  }

  async editData(subjects_plans) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/subjects_plans/${subjects_plans.id}`,
      subjects_plans
    );
    this.subjects_plans = this.subjects_plans.map(
      (item) => (item = item.id === subjects_plans.id ? subjects_plans : item)
    );
    return subjects_plans;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/subjects_plans/${id}`);
    this.subjects_plans = this.subjects_plans.filter((subjects_plans) => subjects_plans.id !== id);
  }
}

export default new SPService();
