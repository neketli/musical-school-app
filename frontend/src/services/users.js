import axios from "axios";
import CryptoJS from "crypto-js";

class UsersService {
  constructor() {
    this.data = [];
    this.columns = [];
    this.label = "Пользователи";
  }

  getColumns() {
    this.columns = [
      {
        label: "id",
        value: "id",
      },
      {
        label: "Пользователь",
        value: "login",
      },
      {
        label: "Пароль",
        value: "password",
      },
      {
        label: "Группа",
        value: "role",
      },
    ];
    return this.columns;
  }

  async getData() {
    if (!this.data.length) {
      const users = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      this.data = users.data;
    }
    return this.data;
  }

  async addData(user) {
    const userInfo = {
      ...user,
      password: CryptoJS.MD5(user.password).toString(),
    };
    const newUser = await axios.post(
      `${import.meta.env.VITE_API_URL}/users`,
      userInfo
    );
    this.data.push(newUser.data);
    return newUser.data;
  }

  async editData(user) {
    const oldPass = !!this.data.filter((item) => {
      item.password === user.password;
    }).length;
    const newUser = {
      ...user,
      password: oldPass
        ? user.password
        : CryptoJS.MD5(user.password).toString(),
    };
    await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${user.id}`,
      newUser
    );
    this.data = this.data.map(
      (item) => (item = item.id === newUser.id ? newUser : item)
    );
    return newUser;
  }

  async removeData(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
    this.data = this.data.filter((user) => user.id !== id);
  }
}

export default new UsersService();
