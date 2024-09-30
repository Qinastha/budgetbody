import { Gender } from "./gender";

export type RegisterProfileForm = {
  email: string;
  password: string;
  userName: string;
  dateOfBirth: string;
  address: string;
  gender: Gender;
};
