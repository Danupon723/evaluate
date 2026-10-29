import axios from "axios";
import { reactive } from "vue";

export const state = reactive({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  message: "",
});

export const api = axios.create({ baseURL: "/api" });

// ✅ interceptors (แก้ typo จาก intercepters)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    state.message = err.response?.data?.message || "เชื่อม API ไม่ได้";
    // ✅ status (ไม่ใช่ state)
    if (err.response?.status === 401) logout();
    return Promise.reject(err);
  },
);

export function saveLogin(token, user) {
  localStorage.setItem("token", token);
  // ✅ ต้อง stringify object ก่อนเก็บ
  localStorage.setItem("user", JSON.stringify(user));
  state.user = user;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // ✅ null จริง ๆ ไม่ใช่ string "null"
  state.user = null;
}

export function fileUrl(name) {
  // ✅ ใส่ / คั่น + encode
  return `/api/files/${encodeURIComponent(name)}?token=${localStorage.getItem(
    "token",
  )}`;
}

export const rules = {
  requires: (v) => (v !== null && v !== undefined && v !== "") || "ห้ามว่าง",
  email: (v) => !v || /^\S+@\S+\.\S+$/.test(v) || "รูปแบบ email ไม่ถูกต้อง",
  min8: (v) => (v && v.length >= 8) || "อย่างน้อย 8 ตัวอักษร",
};

export const roleName = {
  admin: "ผู้ประเมิน",
  evaluatee: "ผู้รับการประเมิน",
  evaluator: "กรรมการ",
};

export const committeeName = {
  chair: "ประธาน",
  member: "กรรมการร่วม",
};

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