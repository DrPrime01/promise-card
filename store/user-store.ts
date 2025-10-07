import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type UserState = {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
};

type UserDetailsStore = {
  user: UserState;
  setUser: (user: UserState) => void;
  getUser: () => UserState;
  logOut: () => void;
};

const initialUserState: UserState = {
  createdAt: new Date(),
  _id: "",
  email: "",
  username: "",
};

export const useUserStore = create<UserDetailsStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: initialUserState,

        setUser: (user) => set({ user }, false, "setUser"),
        logOut: () => set({ user: initialUserState }, false, "logOut"),
        getUser: () => get().user,
      }),
      {
        name: "user-details-store",
      }
    )
  )
);
