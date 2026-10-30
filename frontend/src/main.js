import { createApp } from "vue";
import "./style.css";
import "vuetify/styles";
import App from "./App.vue";
import router from "./router";
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

// ✅ errorHandler แยกออกมา ไม่ chain ต่อ
app.config.errorHandler = (err) => {
  console.error("[Vue Error]", err);
};

// ✅ use + mount แยกเป็นคำสั่งของตัวเอง
app.use(vuetify);
app.use(router);
app.mount("#app");