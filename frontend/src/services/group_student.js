import axios from "axios";

class GroupStudentService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Группы в которых я учусь";
  }

  getColumns() {
    this.columns = [
      {
        label: "id Группы",
        value: "id_group",
      },
      {
        label: "Фамилия",
        value: "last_name",
      },
      {
        label: "Имя",
        value: "first_name",
      },
      {
        label: "Отчество",
        value: "patronymic",
      },
      {
        label: "Дата рождения",
        value: "birthdate",
      },
      {
        label: "Телефон",
        value: "phone",
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
}

export default new GroupStudentService();
