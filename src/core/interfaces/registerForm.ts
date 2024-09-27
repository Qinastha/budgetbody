import { Gender } from "../types/gender";

export interface RegisterFormFields {
  email: string;
  password: string;
  userName: string;
  dob: string;
  address: string;
  gender: Gender;
}
