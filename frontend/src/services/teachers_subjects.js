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

  async getData() {
    if (!this.data.length) {
      const subjects_teachers = await axios.get(
        `${import.meta.env.VITE_API_URL}/subjects_teachers?teachers=true`
      );
      this.data = subjects_teachers.data;
    }
    return this.data;
  }
}

export default new TSService();
