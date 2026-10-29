import axios from "axios";
import { reactive } from "vue";

export const state = reactive({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  massege: "",
});
