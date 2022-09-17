import axios from "axios";

class JournalsService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Журнал";
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
        label: "id ученика",
        value: "id_student",
      },
      {
        label: "id предмета",
        value: "id_subject",
      },
    ];
    return this.columns;
  }

  async getData() {
    if (!this.data.length) {
      const journals = await axios.get(
        `${import.meta.env.VITE_API_URL}/journals`
      );
      this.data = journals.data;
    }
    return this.data;
  }

  async addData(journal) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/journals`,
      journal
    );
    this.data.push(response.data);
    return response.data;
  }

  async editData(journal) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/journals/${journal.id}`,
      journal
    );
    this.data = this.data.map(
      (item) => (item = item.id === journal.id ? journal : item)
    );
    return journal;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/journals/${id}`);
    this.data = this.data.filter((journal) => journal.id !== id);
  }
}

export default new JournalsService();
