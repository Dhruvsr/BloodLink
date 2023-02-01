import { API_URL } from "@/constants";
import { useUser } from "@/context/user";
import axios from "axios";
import { useEffect } from "react";

export default function useHydrateUserState() {
  const user = useUser((d) => d.user);
  const setUser = useUser((d) => d.setUser);

  useEffect(() => {
    if (user.id) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(`${API_URL}/hydrate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((d) => d.data)
      .then(setUser)
      .catch((err) => {});
  }, []);
}
