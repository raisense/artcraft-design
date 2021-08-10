<template>
  <div
    ref="main"
    :class="{
      'full-screen': isAppSmallThanWindow
    }"
  >
    <SvgSprite />
    <slot />
    <MenuList />
  </div>
</template>

<script>
import { resolveLang } from "~/utils/lang";
import { slugify } from "~/utils/slug";

export default {
  data() {
    return {
      isAppSmallThanWindow: false
    };
  },
  methods: {
    checkAppHeight() {
      this.isAppSmallThanWindow =
        this.$refs.main.clientHeight < window.innerHeight;
    }
  },
  async mounted() {
    this.checkAppHeight();
    window.addEventListener("resize", this.checkAppHeight);

    const lang = resolveLang(this.$i18n.locale);

    const servicesDoc = await this.$prismic.api.query(
      this.$prismic.predicates.at("document.type", "services"),
      { lang }
    );

    const categoriesDoc = await this.$prismic.api.query(
      this.$prismic.predicates.at("document.type", "categories"),
      { lang }
    );

    if (servicesDoc) {
      const services = servicesDoc.results.map(service => ({
        element: "nuxt-link",
        attributes: {
          to: this.localePath(
            `/services/#${slugify(
              this.$prismic.asText(service.data.service_title)
            )}`
          )
        },
        title: this.$prismic.asText(service.data.service_title)
      }));
      this.$store.commit("UPDATE_MENU_LINKS", { services });
    }

    if (categoriesDoc) {
      const categories = categoriesDoc.results.map(category => ({
        element: "nuxt-link",
        attributes: {
          to: this.localePath(
            `/projects/#${slugify(
              this.$prismic.asText(category.data.category_title)
            )}`
          )
        },
        title: this.$prismic.asText(category.data.category_title)
      }));
      this.$store.commit("UPDATE_MENU_LINKS", { categories });
    }
  },
  created() {
    this.$store.dispatch("getSocialLinks");
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkAppHeight);
  }
};
</script>

<style>
.full-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.full-screen #footer-wrapper {
  margin-top: auto !important;
}
</style>
