import axios from "axios";
import CryptoJS from "crypto-js";

class UserService {
  constructor() {
    this.users = [];
    this.columns = [];
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
        value: "user_group",
      },
    ];
    return this.columns;
  }

  async getUsers() {
    if (!this.users.length) {
      const users = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      this.users = users.data;
    }
    return this.users;
  }

  async addUser(user) {
    const userInfo = {
      ...user,
      password: CryptoJS.MD5(user.password).toString(),
    };
    const newUser = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
    this.users.push(newUser.data);
    return newUser.data;
  }
  async editUser(user) {
    const oldPass = !!this.users.filter(item => {item.password === user.password}).length
    const newUser = {
      ...user,
      password: oldPass ? user.password : CryptoJS.MD5(user.password).toString(),
    };
    await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${user.id}`,
      newUser
    );
    this.users = this.users.map(
      (item) => (item = item.id === newUser.id ? newUser : item)
    );
    return newUser;
  }

  async removeUser(id) {
    await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export default new UserService();
