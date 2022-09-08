import axios from "axios";

class SubjectsService {
  constructor() {
    this.subjects = [];
    this.columns = [];
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

  async getSubjects() {
    if (!this.subjects.length) {
      const subjects = await axios.get(
        `${import.meta.env.VITE_API_URL}/subjects`
      );
      this.subjects = subjects.data;
    }
    return this.subjects;
  }

  async addSubject(subject) {
    await axios.post(`${import.meta.env.VITE_API_URL}/subjects`, subject);
    this.subjects.push(subject);
    return subject;
  }
  async editSubject(subject) {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/subjects/${subject.id}`,
      subject
    );
    this.subjects = this.subjects.map(
      (item) => (item = item.id === subject.id ? subject : item)
    );
    return subject;
  }

  async removeSubject(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/subjects/${id}`);
    this.subjects = this.subjects.filter((subject) => subject.id !== id);
  }
}

export default new SubjectsService();
