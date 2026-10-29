<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon v-if="user" @click="drawer = !drawer" />
      <v-app-bar-title>ระบบประเมินบุคลากร</v-app-bar-title>
      <template v-if="user">
        <span class="d-none d-sm-inline mr-2">{{ user.full_name }}</span>
        <v-btn icon="mdi-logout" @click="logout(), $router.push('/login')" />
      </template>
    </v-app-bar>

    <v-navigation-drawer v-if="user && !user.must_change_password" v-model="drawer">
      <v-list nav :items="items" />
    </v-navigation-drawer>

    <v-main><v-container><router-view /></v-container></v-main>

    <v-snackbar :model-value="!!state.message" :text="state.message" @update:model-value="state.message = ''" />
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { state, logout } from './api';

const drawer = ref(null);
const user = computed(() => state.user);

const menus = {
  admin: [
    ['/dashboard', 'view-dashboard', 'Dashboard'],
    ['/users', 'account-group', 'ผู้ใช้งาน'],
    ['/periods', 'calendar', 'รอบและตัวชี้วัด'],
    ['/assign', 'account-tie', 'มอบหมายกรรมการ'],
    ['/track', 'chart-box', 'ติดตามและรายงาน'],
    ['/backup', 'database', 'สำรอง/กู้คืนข้อมูล'],
  ],
  evaluatee: [['/self', 'clipboard-edit', 'ประเมินตนเอง']],
  evaluator: [['/evaluate', 'clipboard-check', 'รายชื่อที่ต้องประเมิน']],
};
const common = [
  ['/profile', 'account', 'ข้อมูลส่วนตัว'],
  ['/password', 'key', 'เปลี่ยนรหัสผ่าน'],
];

const items = computed(() =>
  [...(menus[user.value?.role] || []), ...common].map(([to, icon, title]) => ({
    to, title, prependIcon: `mdi-${icon}`,
  }))
);
</script>