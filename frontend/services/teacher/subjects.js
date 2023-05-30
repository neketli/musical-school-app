export default class TeachersService {
  constructor(axios) {
    this.data = [];
    this.axios = axios;
    this.columns = [
      {
        label: "Фамилия",
      },
      {
        label: "Имя",
      },
      {
        label: "Отчество",
      },
      {
        label: "Предмет",
      },
    ];
    this.label = "Список преподавателей и предметы которые они ведут";
    this.url = "/subjects_teachers";
  }

  async fetch() {
    const { data } = await this.axios.get(this.url, {
      params: {
        teachers: true,
      },
    });
    this.data = data;
  }

  async getData() {
    if (!this.data.length) {
      await this.fetch();
    }
    return this.data;
  }
}
