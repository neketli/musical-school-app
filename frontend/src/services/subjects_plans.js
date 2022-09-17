import axios from "axios";

class SPService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Добавить планы к предметам";
  }

  getColumns() {
    this.columns = [
      {
        label: "id",
        value: "id",
      },
      {
        label: "Предмет",
        value: "id_subject",
      },
      {
        label: "План",
        value: "id_plan",
      },
    ];
    return this.columns;
  }

  async getData() {
    if (!this.data.length) {
      const subjects_plans = await axios.get(
        `${import.meta.env.VITE_API_URL}/subjects_plans`
      );
      this.data = subjects_plans.data;
    }
    return this.data;
  }

  async addData(subjects_plans) {
    const newData = await axios.post(
      `${import.meta.env.VITE_API_URL}/subjects_plans`,
      subjects_plans
    );
    this.data.push(newData.data);
    return newData.data;
  }

  async editData(subjects_plans) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/subjects_plans/${subjects_plans.id}`,
      subjects_plans
    );
    this.data = this.data.map(
      (item) => (item = item.id === subjects_plans.id ? subjects_plans : item)
    );
    return subjects_plans;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/subjects_plans/${id}`);
    this.data = this.data.filter((subjects_plans) => subjects_plans.id !== id);
  }
}

export default new SPService();
