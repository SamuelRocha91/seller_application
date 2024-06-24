import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavStore = defineStore("nav", () => {
  const navActive = ref<boolean>(true);

  function setNav() {
    navActive.value = !navActive.value;
  }

  return { navActive, setNav };
});