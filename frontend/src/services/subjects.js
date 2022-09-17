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
        label: "id",
        value: "id",
      },
      {
        label: "Название",
        value: "title",
      },
    ];
    return this.columns;
  }

  async getData() {
    if (!this.data.length) {
      const subjects = await axios.get(
        `${import.meta.env.VITE_API_URL}/subjects`
      );
      this.data = subjects.data;
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
}

export default new SubjectsService();
