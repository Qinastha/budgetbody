import store from "./store";
import { fetchUserData, getUser } from "./store/userSlice";

const { dispatch, getState } = store;

export const userLoader = async () => {
  await dispatch(fetchUserData());

  const state = getState();
  const user = getUser(state);
  console.log(user);

  return user;
};
