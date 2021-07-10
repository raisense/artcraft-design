<template>
  <nav class="navbar">
    <div class="container mx-auto justify-between items-center flex">
      <nuxt-link :to="localePath('/')">
        <img src="~/assets/icons/logo.svg" />
      </nuxt-link>
      <div>
        <vsm-menu
          class="font-medium hidden lg:inline-block"
          :menu="links"
          :base-width="400"
          :base-height="400"
          :screen-offset="20"
          element="header"
          handler="hover"
        >
          <template #default="{ item }">
            <div class="wrap-content" v-if="item.children.length > 0">
              <nuxt-link
                prefetch
                :to="child.attributes.to"
                class="block whitespace-nowrap transition-transform duration-250 transform hover:translate-x-2 text-lg mb-3 last:mb-0 font-medium"
                v-for="(child, idx) in item.children"
                :key="`child-${idx}`"
              >
                {{ $t(child.title) }}
              </nuxt-link>
            </div>
          </template>

          <template #title="data">
            {{ $t(data.item.title) }}
          </template>
        </vsm-menu>
        <LangPicker class="lg:ml-6" />
        <Menu class="lg:hidden" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    links() {
      return this.$store.state.links;
    }
  }
};
</script>

<style scoped>
.navbar {
  z-index: 120;
  @apply px-5 md:px-0 shadow-lg relative py-2;
}

.menu-btn {
  /* width: 48px;
  height: 48px; */

  @apply p-1;
}

.vsm-menu {
  /* margin: 10px; */
}

.vsm-menu ul {
  max-width: 1024px;
  margin: 0 auto;
}

/*  Let's simplify the work with menu items (logo, menu, buttons, etc) */
.vsm-root {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* // All menu items (element props: a, button, span, etc) are
// made the same in style */
.vsm-section_menu > * {
  padding: 0 25px;
  font-weight: 500;
  font-family: inherit;
}

/* // Styles for Dropdown Content: */
.wrap-content {
  padding: 30px;
}
</style>

<style>
.vsm-section_menu {
  height: 36px;
  align-items: center;
}

.vsm-dropdown {
  top: 37px !important;
}

.vsm-link {
  color: #000;
  height: 36px;
  line-height: 1;
  @apply flex items-center hover:text-gray-800;
}
</style>
