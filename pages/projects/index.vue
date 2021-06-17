<template>
  <div>
    <h1 class="text-4xl md:text-6xl text-center font-bold mb-16">
      {{ $t("navbar.projects") }}
    </h1>

    <div class="grid gird-cols-1 md:grid-cols-2 gap-5">
      <nuxt-link
        class="project-card"
        v-for="project in document.results"
        :key="project.id"
        :to="localePath(`/projects/${project.uid}`)"
      >
        <figure class="aspect-w-4 aspect-h-4 md:aspect-h-3">
          <nuxt-img
            class="object-cover"
            :src="project.data.featured_image.url"
            sizes="md:360px lg:640px"
          />
        </figure>
        <div class="card-overlay">
          <prismic-rich-text class="title" :field="project.data.title" />
          <prismic-rich-text class="excerpt" :field="project.data.excerpt" />
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { resolveLang } from "~/utils/lang";

export default {
  head() {
    return {
      title: this.$t("navbar.projects")
    };
  },

  async asyncData({ $prismic, i18n, params, error }) {
    const lang = resolveLang(i18n.locale);

    const document = await $prismic.api.query(
      $prismic.predicates.at("document.type", "projects"),
      {
        lang: lang
      }
    );

    if (document) {
      return { document };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
};
</script>

<style>
.project-card {
  @apply relative;
}

.card-overlay {
  width: 100%;

  @apply py-6 flex flex-col justify-end;
}

.project-card .title {
  @apply text-2xl font-semibold mb-3;
}

.project-card .excerpt p {
  @apply line-clamp-2;
}
</style>
