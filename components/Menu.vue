<template>
  <div class="inline-block">
    <button
      class="menu-trigger"
      :class="{ 'is-close': visible }"
      @click="triggerMenu"
    >
      <div class="mb-2 bg-black"></div>
      <div class="bg-black"></div>
    </button>
  </div>
</template>

<script>
import { defineComponent, useStore, computed } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const store = useStore();

    const visible = computed(() => store.state.menuVisible);

    const triggerMenu = () => {
      store.commit("TRIGGER_MENU");
    };

    return {
      visible,
      triggerMenu
    };
  }
});
</script>

<style>
.menu-fade-enter-active {
  transition: all 0.3s ease-out;
}

.menu-fade-leave-active {
  transition: all 0.25s ease-in-out;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

.menu-trigger {
  position: relative;
  z-index: 100;
  @apply ml-4 md:ml-8;
  width: 48px;
  height: 48px;
}

.menu-trigger:hover > div:first-child {
  width: 60%;
}

.menu-trigger:hover > div:last-child {
  width: 100%;
}

.menu-trigger > div {
  height: 3px;
  transition: all 0.2s;
}
.menu-trigger > div:first-child {
  width: 100%;
}
.menu-trigger > div:last-child {
  width: 60%;
  margin-left: auto;
}

.menu-trigger.is-close > div:first-child {
  transform: translateX(12px) rotate(45deg);
  transform-origin: 20% 50%;
  width: 60%;
}

.menu-trigger.is-close > div:last-child {
  transform: translateX(-8px) rotate(-45deg);
  transform-origin: 28% 50%;
  width: 60%;
}

.menu-header {
  height: 110px;

  @apply py-8 flex justify-end items-center;
}
</style>
