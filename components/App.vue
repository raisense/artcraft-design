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

    const doc = await this.$prismic.api.getSingle("services", { lang });

    if (doc) {
      const services = doc.data.body.map(slice => ({
        element: "nuxt-link",
        attributes: {
          to: this.localePath(
            `/services/#${slugify(
              this.$prismic.asText(slice.primary.service_title)
            )}`
          )
        },
        title: this.$prismic.asText(slice.primary.service_title)
      }));

      this.$store.commit("UPDATE_SERVICE_LINKS", services);
    }
  }
};
</script>

<style></style>
