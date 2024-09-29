import { Gender } from "./gender";

export type RegisterProfileForm = {
  email: string;
  password: string;
  userName: string;
  dob: string;
  address: string;
  gender: Gender;
};
