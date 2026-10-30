import axios from "axios";
import { reactive } from "vue";

const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const state = reactive({
  user: loadUser(),
  message: "",
});

export const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function saveLogin(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  state.user = user;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  state.user = null;
}

export const fileUrl = (name) =>
  `/api/files/${encodeURIComponent(name)}?token=${localStorage.getItem("token")}`;

export const roleName = {
  admin: "ผู้ประเมิน",
  evaluatee: "ผู้รับการประเมิน",
  evaluator: "กรรมการ",
};

export const committeeName = { chair: "ประธาน", member: "กรรมการร่วม" };

export const status = {
  pending: "ยังไม่ประเมิน",
  draft: "บันทึกร่าง",
  confirmed: "ยืนยันผลแล้ว",
};

export const statusColor = {
  pending: "gray",
  draft: "orange",
  confirmed: "green",
};