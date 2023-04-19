import axios from "axios";

class HistoryService {
  constructor() {
    this.data = [];
    this.columns = [];
  }

  async updateData(value) {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/history`,
      value
    );
    this.data = data.rows;
    this.columns = data.columns.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  }

  // {table: 'table_name', limit?: 10, op_id?: ?}
  async getData(value) {
    await this.updateData(value);
    return this.data;
  }

  getColumns() {
    return this.columns;
  }
}

export default new HistoryService();
