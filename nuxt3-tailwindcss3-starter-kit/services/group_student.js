import axios from "axios";

class GroupStudentService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Мои группы";
  }

  getColumns() {
    this.columns = [
      {
        label: "Номер группы",
        value: "id_group",
        type: "input",
      },
      {
        label: "Форма обучения",
        value: "form",
        type: "input",
      },
      {
        label: "Специальность",
        value: "speciality",
        type: "input",
      },
      {
        label: "Инструмент",
        value: "instrument",
        type: "input",
      },
    ];
    return this.columns;
  }

  async updateData(value) {
    const groups = await axios.get(
      `${import.meta.env.VITE_API_URL}/students_groups?id_student=${value}`
    );
    this.data = groups.data;
  }

  async getData(value, isUpdate = false) {
    if (!this.data.length || isUpdate) {
      await this.updateData(value);
    }
    return this.data;
  }

  async revertData(value = {}) {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/students_groups/undo`,
      value
    );
    await this.updateData();
    return this.data;
  }
}

export default new GroupStudentService();
