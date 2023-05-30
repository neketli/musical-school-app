export default class HistoryService {
  constructor(axios) {
    this.axios = axios;
    this.data = [];
    this.columns = [];
    this.url = "/history";
  }

  async fetch(value) {
    const { data } = await this.axios.post(this.url, value);
    this.data = data.rows;
    this.columns = data.columns.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  }

  async getData(value) {
    await this.fetch(value);
    return this.data;
  }
}
