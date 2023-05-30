import CryptoJS from "crypto-js";

export default class UsersService {
  constructor({ axios }) {
    this.data = [];
    this.columns = [
      {
        label: "Логин",
        value: "login",
        type: "input",
      },
      {
        label: "Пароль",
        value: "password",
        type: "input",
      },
      {
        label: "Пользователь",
        value: "rid",
        type: "select",
      },
      {
        label: "Группа",
        value: "role_select",

        type: "select",
        selectOptions: [
          { label: "Ученик", value: "student", key: "role" },
          { label: "Преподаватель", value: "teacher", key: "role" },
          { label: "Директор", value: "director", key: "role" },
          { label: "Администратор", value: "admin", key: "role" },
        ],
      },
    ];
    this.url = `/users`;

    this.label = "Пользователи";
    this.axios = axios;
  }

  async fetch() {
    const { data } = await this.axios.get(this.url);
    this.data = data;
  }

  async getData() {
    if (!this.data.length) {
      await this.fetch();
    }
    return this.data;
  }

  async create(user) {
    const userInfo = {
      ...user,
      password: CryptoJS.MD5(user.password).toString(),
    };
    const newUser = await this.axios.post(this.url, userInfo);
    this.data.push(newUser.data);
    return newUser.data;
  }

  async update(user) {
    const oldPass = !!this.data.filter(
      (item) => item.password === user.password
    ).length;
    const newUser = {
      ...user,
      password: oldPass
        ? user.password
        : CryptoJS.MD5(user.password).toString(),
    };

    await this.axios.put(`${this.url}/${user.id}`, newUser);

    this.data = this.data.map(
      (item) => (item = item.id === newUser.id ? newUser : item)
    );
    return newUser;
  }

  async remove(id) {
    await this.axios.delete(`${this.url}/${id}`);
    this.data = this.data.filter((user) => user.id !== id);
  }

  async revert(value = {}) {
    await this.axios.post(`${this.url}/undo`, value);
    await this.fetch();
    return this.data;
  }
}
