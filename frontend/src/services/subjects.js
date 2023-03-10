import axios from "axios";

class SubjectsService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Предметы";
  }

  getColumns() {
    this.columns = [
      {
        label: "Название",
        value: "title",
        type: "input",
      },
    ];
    return this.columns;
  }

  async updateData() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/subjects`
    );
    this.data = data;
  }

  async getData() {
    if (!this.data.length) {
      await this.updateData();
    }
    return this.data;
  }

  async addData(subject) {
    const newSubject = await axios.post(
      `${import.meta.env.VITE_API_URL}/subjects`,
      subject
    );
    this.data.push(newSubject.data);
    return newSubject.data;
  }

  async editData(subject) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/subjects/${subject.id}`,
      subject
    );
    this.data = this.data.map(
      (item) => (item = item.id === subject.id ? subject : item)
    );
    return subject;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/subjects/${id}`);
    this.data = this.data.filter((subject) => subject.id !== id);
  }

  async revertData(value = {}) {
    await axios.post(`${import.meta.env.VITE_API_URL}/subjects/undo`, value);
    await this.updateData();
    return this.data;
  }
}

export default new SubjectsService();
