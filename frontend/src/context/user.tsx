import { create } from "zustand";

interface UserState {
  avatarUrl: string;
  id: string;
  role: "Donor" | "Patient";
  name?: string;
}

export const useUser = create<{
  user: UserState;
  setUser: (user: Partial<UserState>) => void;
}>((set) => ({
  user: {
    avatarUrl: "",
    id: "",
    role: "Donor",
  },
  setUser(user) {
    set((state) => ({ user: { ...state.user, ...user } }));
  },
}));
