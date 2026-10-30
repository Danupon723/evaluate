<template>
  <v-card max-width="420" class="mx-auto mt-10 pa-4">
    <v-card-title>เข้าสู่ระบบ</v-card-title>
    <v-form @submit.prevent="login">
      <v-text-field v-model="username" label="ชื่อผู้ใช้" prepend-inner-icon="mdi-account" />
      <v-text-field v-model="password" label="รหัสผ่าน" type="password" prepend-inner-icon="mdi-lock" />
      <v-btn type="submit" color="primary" block>เข้าสู่ระบบ</v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { homeOf } from "../router";
import { api, saveLogin } from "../api";

const router = useRouter();
const username = ref("");
const password = ref("");

async function login() {
  const res = await api.post("/auth/login", {
    username: username.value,
    password: password.value,
  });
  const { token, user } = res.data.data;
  saveLogin(token, user);
  router.push(homeOf(user));
}
</script>