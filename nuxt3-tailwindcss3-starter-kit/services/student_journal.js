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
        label: "Тип оценки",
        value: "type",
        type: "input",
      },
      {
        label: "Дата выставления",
        value: "date",
        type: "input",
      },
      {
        label: "Оценка",
        value: "grade",
        type: "input",
      },
      {
        label: "Предмет",
        value: "title",
        type: "input",
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
