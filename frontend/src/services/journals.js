import axios from "axios";

class JournalsService {
  constructor() {
    this.journals = [];
    this.columns = [];
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
    if (!this.journals.length) {
      const journals = await axios.get(
        `${import.meta.env.VITE_API_URL}/journals`
      );
      this.journals = journals.data;
    }
    return this.journals;
  }

  async addData(journal) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/journals`,
      journal
    );
    this.journals.push(response.data);
    return response.data;
  }

  async editData(journal) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/journals/${journal.id}`,
      journal
    );
    this.journals = this.journals.map(
      (item) => (item = item.id === journal.id ? journal : item)
    );
    return journal;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/journals/${id}`);
    this.journals = this.journals.filter((journal) => journal.id !== id);
  }
}

export default new JournalsService();
