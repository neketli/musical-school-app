export default class GroupStudentService {
  constructor(axios) {
    this.data = [];
    this.axios = axios;
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
    this.label = "Мои группы";
    this.url = "/students_groups";
  }

  async fetch(idStudent) {
    const groups = await this.axios.get(this.url, {
      params: { id_student: idStudent },
    });
    this.data = groups.data;
  }

  async getData(value, isUpdate = false) {
    if (!this.data.length || isUpdate) {
      await this.fetch(value);
    }
    return this.data;
  }

  async revertData(value = {}) {
    await axios.post(`${this.url}/undo`, value);
    await this.fetch();
    return this.data;
  }
}
