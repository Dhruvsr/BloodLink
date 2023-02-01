import { API_URL } from "@/constants";
import { RegisterDonorForm } from "@/types/forms";
import axios from "axios";

type RegisterDonorResponse = {
  token: string;
  user: {
    avatarUrl: string;
    id: string;
    role: "Donor" | "Patient";
  };
};

export async function registerDonor(donor: any) {
  let errorMessage = "";
  const res = await axios
    .post<RegisterDonorResponse>(`${API_URL}/auth/donor/signup`, donor)
    .catch((err) => {
      errorMessage =
        err?.response?.data?.errors?.[0].message ||
        err?.response?.data?.message ||
        "Something went wrong";
      return null;
    });
  if (res === null) {
    return {
      error: true,
      message: errorMessage,
      data: null,
    };
  }
  return {
    error: false,
    data: res.data,
    message: null,
  };
}
