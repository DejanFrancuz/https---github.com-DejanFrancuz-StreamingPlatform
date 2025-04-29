import { Person } from "./Person";

export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginResponse {
    jwt: string;
    personData: Person,
}
