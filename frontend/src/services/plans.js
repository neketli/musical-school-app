import axios from "axios";

class PlansService {
  constructor() {
    this.plans = [];
    this.columns = [];
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
      {
        label: "Специальность",
        value: "id_speciality",
      },
    ];
    return this.columns;
  }

  async getPlans() {
    if (!this.plans.length) {
      const plans = await axios.get(`${import.meta.env.VITE_API_URL}/plans`);
      this.plans = plans.data;
    }
    return this.plans;
  }

  async addPlan(plan) {
    await axios.post(`${import.meta.env.VITE_API_URL}/plans`, plan);
    this.plans.push(plan);
    return plan;
  }
  async editPlan(plan) {
    await axios.put(`${import.meta.env.VITE_API_URL}/plans/${plan.id}`, plan);
    this.plans = this.plans.map(
      (item) => (item = item.id === plan.id ? plan : item)
    );
    return plan;
  }

  async removePlan(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/plans/${id}`);
    this.plans = this.plans.filter((plan) => plan.id !== id);
  }
}

export default new PlansService();
