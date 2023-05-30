export default class StudentJournalService {
  constructor(axios) {
    this.axios = axios;
    this.data = [];
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
    this.label = "Дневник";
    this.url = "journals";
  }

  async fetch(value) {
    const { data } = await axios.get(this.url, {
      params: {
        id_student: value,
      },
    });
    this.data = data;
  }

  async getData(value) {
    if (!this.data.length) {
      await this.fetch(value);
    }
    return this.data;
  }
}
