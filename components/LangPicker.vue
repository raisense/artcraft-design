<template>
  <div class="inline-block">
    <select
      id="lang-picker"
      class="lang-picker-select text-sm md:text-base"
      v-model="selectedLang"
    >
      <option v-for="lang in languages" :value="lang.id" :key="lang.id">
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  watch,
  useContext,
  useRouter
} from "@nuxtjs/composition-api";
import { ChevronDownIcon } from "vue-feather-icons";

export default defineComponent({
  component: { ChevronDownIcon },
  setup() {
    const { app } = useContext();
    const router = useRouter();

    const languages = [
      { id: "ru", name: "Русский" },
      { id: "uz", name: "O'zbekcha" },
      { id: "en", name: "English" }
    ];

    const selectedLang = ref(app.i18n.locale);
    const currentLang = computed(() =>
      languages.find(lang => lang.id === selectedLang.value)
    );

    watch(selectedLang, newValue =>
      router.push(app.switchLocalePath(newValue))
    );

    return {
      languages,
      currentLang,
      selectedLang
    };
  }
});
</script>

<style scoped>
.lang-picker-select {
  background: transparent;
  color: #fff;
  @apply relative px-2 text-black font-medium;
}

.lang-picker-select option {
  @apply text-black bg-white;
}
</style>
