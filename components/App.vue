<template>
  <div>
    <SvgSprite />
    <slot />
    <MenuList />
  </div>
</template>

<script>
import { resolveLang } from "~/utils/lang";
import { slugify } from "~/utils/slug";

export default {
  async mounted() {
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
  }
};
</script>

<style></style>
