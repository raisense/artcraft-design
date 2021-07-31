<template>
  <div>
    <Navbar />
    <Slider :projects="projects" />
  </div>
</template>

<script>
import { resolveLang } from "~/utils/lang";

export default {
  layout: "homepage",
  head() {
    return {
      title: this.$t("Homepage")
    };
  },
  async asyncData({ $prismic, i18n, error }) {
    const lang = resolveLang(i18n.locale);

    const document = await $prismic.api.query(
      $prismic.predicates.at("document.type", "homepage"),
      {
        fetchLinks: "projects.title,projects.cover_image,projects.order",
        lang
      }
    );

    const byOrder = (a, b) =>
      a.featured_project.data.order - b.featured_project.data.order;

    const projects = document.results[0].data.featured_projects.sort(byOrder);

    if (document) {
      return { document, projects };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.home-screen {
  background-image: url("/home.jpg");
}

.hero-wrapper {
  height: calc(100% - 88px - 118px);
}
</style>
