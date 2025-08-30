import type { LoginPayload } from "@/types";
import axios from "./axios";

export async function Login(payload: LoginPayload) {
  const { data } = await axios.post(`/auth/login`, { ...payload });
  return data;
}

export async function getDetailUser(id: number) {
  const { data } = await axios.post(`/users/${id}`);
  return data;
}
