import axios from "axios";

class StudentJournalService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Дневник";
  }

  getColumns() {
    this.columns = [
      {
        label: "id",
        value: "id",
      },
      {
        label: "Тип оценки",
        value: "type",
      },
      {
        label: "Дата выставления",
        value: "date",
      },
      {
        label: "Оценка",
        value: "grade",
      },
      {
        label: "Предмет",
        value: "title",
      },
    ];
    return this.columns;
  }

  async updateData(value) {
    const journals = await axios.get(
      `${import.meta.env.VITE_API_URL}/journals?id_student=${value}`
    );
    this.data = journals.data;
  }

  async getData(value) {
    if (!this.data.length) {
      await this.updateData(value);
    }
    return this.data;
  }
}

export default new StudentJournalService();
