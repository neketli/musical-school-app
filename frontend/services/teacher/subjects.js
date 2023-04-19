import axios from "axios";

class TSService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Список преподавателей и предметы которые они ведут";
  }

  getColumns() {
    this.columns = [
      {
        label: "Фамилия",
      },
      {
        label: "Имя",
      },
      {
        label: "Отчество",
      },
      {
        label: "Предмет",
      },
    ];
    return this.columns;
  }

  async updateData() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/subjects_teachers?teachers=true`
    );
    this.data = data;
  }

  async getData() {
    if (!this.data.length) {
      await this.updateData();
    }
    return this.data;
  }
}

export default new TSService();
