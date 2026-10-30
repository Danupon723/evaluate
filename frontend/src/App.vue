<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon v-if="state.user" @click="drawer = !drawer" />
      <v-app-bar-title>ระบบประเมิน</v-app-bar-title>
      <template v-if="state.user">
        <span class="d-none d-sm-inline mr-2">{{ state.user.full_name }}</span>
        <v-btn icon="mdi-logout" @click="signout" />
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-if="state.user && !state.user.must_change_password"
      v-model="drawer"
    >
      <v-list nav>
        <v-list-item
          v-for="m in menus[state.user.role]"
          :key="m.to"
          :to="m.to"
          :prepend-icon="m.icon"
          :title="m.title"
        />
        <v-divider />
        <v-list-item to="/profile" prepend-icon="mdi-account" title="ข้อมูลส่วนตัว" />
        <v-list-item to="/password" prepend-icon="mdi-key" title="เปลี่ยนรหัสผ่าน" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { state, logout } from "./api";
import { useRouter } from "vue-router";

const router = useRouter();
const drawer = ref(true);

const menus = {
  admin: [
    { to: "/dashbord", icon: "mdi-view-dashboard", title: "Dashboard" },
    { to: "/users", icon: "mdi-account-group", title: "ผู้ใช้งาน" },
    { to: "/periods", icon: "mdi-calendar", title: "รอบและตัวชี้วัด" },
    { to: "/assign", icon: "mdi-account-tie", title: "มอบหมายกรรมการ" },
    { to: "/track", icon: "mdi-chart-box", title: "ติดตามและรายงาน" },
    { to: "/backup", icon: "mdi-database", title: "สำรอง/กู้คืนข้อมูล" },
  ],
  evaluatee: [{ to: "/self", icon: "mdi-account-check", title: "ประเมินตัวเอง" }],
  evaluator: [{ to: "/evaluate", icon: "mdi-clipboard-check", title: "รายชื่อที่ต้องประเมิน" }],
};

function signout() {
  logout();
  router.push("/login");
}
</script>