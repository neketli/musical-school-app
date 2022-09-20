import axios from "axios";

class PlansService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Планы";
  }

  getColumns() {
    this.columns = [
      {
        label: "id",
        value: "id",
      },
      {
        label: "Номер плана",
        value: "number",
      },
      {
        label: "Учебный год",
        value: "year",
      },
    ];
    return this.columns;
  }

  async updateData() {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/plans`);
    this.data = data;
  }

  async getData() {
    if (!this.data.length) {
      await this.updateData();
    }
    return this.data;
  }

  async addData(plan) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/plans`,
      plan
    );
    this.data.push(response.data);
    return response.data;
  }

  async editData(plan) {
    await axios.put(`${import.meta.env.VITE_API_URL}/plans/${plan.id}`, plan);
    this.data = this.data.map(
      (item) => (item = item.id === plan.id ? plan : item)
    );
    return plan;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/plans/${id}`);
    this.data = this.data.filter((plan) => plan.id !== id);
  }

  async revertData(value = {}) {
    await axios.post(`${import.meta.env.VITE_API_URL}/plans/undo`, value);
    await this.updateData();
    return this.data;
  }
}

export default new PlansService();
