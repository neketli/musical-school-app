import { Axios } from "axios";
import { DefaultServiceType, DefaultServices } from "./tables";

interface Column {
  label: string;
  value: string;
  type?: string;
}

export interface IDefaultService {
  data: Array<any>;
  columns: Array<Column>;
  label: string;
  url: string;

  getData: () => Promise<Array<any>>;
  fetch: () => Promise<void>;
  update: (data: any) => Promise<any>;
  create: (data: any) => Promise<any>;
  remove: (id: number) => Promise<Array<any>>;
  revert: (data: any) => Promise<Array<any>>;
}

type DefaultProps = {
  columns: Array<Column>;
  label: string;
  url: string;
  axios: Axios;
};

export class DefaultService implements IDefaultService {
  data: any[];
  columns: Column[];
  label: string;
  url: string;
  axios: Axios;

  constructor({ columns, label, url, axios }: DefaultProps) {
    this.data = [];
    this.columns = columns;
    this.label = label;
    this.url = `${import.meta.env.VITE_API_URL}${url}`;
    this.axios = axios;
  }

  getData = async () => {
    if (!this.data.length) {
      await this.fetch();
    }
    return this.data;
  };

  fetch = async () => {
    const { data } = await this.axios.get(this.url);
    this.data = data;
  };

  create = async (item: any) => {
    const { data } = await this.axios.post(this.url, item);
    this.data.push(data);
    return this.data;
  };

  update = async (data: any) => {
    await this.axios.put(`${this.url}/${data.id}`, data);
    this.data = this.data.map(
      (item) => (item = item.id === data.id ? data : item)
    );
    return this.data;
  };

  remove = async (id: number) => {
    await this.axios.delete(`${this.url}/${id}`);
    this.data = this.data.filter((item) => item.id !== id);
    return this.data;
  };

  revert = async (data: any = {}) => {
    await this.axios.post(`${this.url}/undo`, data);
    await this.fetch();
    return this.data;
  };
}

export const DefaultServiceFactory = (
  axios: Axios,
  type: DefaultServiceType
) => {
  return new DefaultService({ axios, ...DefaultServices[type] });
};
