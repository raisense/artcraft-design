<template>
  <div>
    <h1 class="text-2xl md:text-3xl text-left font-bold mb-16">
      {{ $t("navbar.projects") }}
    </h1>

    <section
      class="mb-30"
      v-for="(category, index) in document.results"
      :key="`category-${index}`"
      :id="slugify($prismic.asText(category.data.category_title))"
    >
      <prismic-rich-text
        class="section-title"
        :field="category.data.category_title"
      />
      <div class="grid gird-cols-1 md:grid-cols-2 gap-16">
        <nuxt-link
          class="project-card"
          v-for="project in category.data.category_projects"
          :key="project.category_project.id"
          :to="localePath(`/projects/${project.category_project.uid}`)"
        >
          <figure class="aspect-w-4 aspect-h-4 md:aspect-h-3">
            <nuxt-img
              class="object-cover"
              :src="project.category_project.data.secondary_cover.url"
              sizes="md:360px lg:640px"
            />
          </figure>
          <div class="card-overlay">
            <prismic-rich-text
              class="title"
              :field="project.category_project.data.title"
            />
            <prismic-rich-text
              class="excerpt"
              :field="project.category_project.data.excerpt"
            />
          </div>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import { resolveLang } from "~/utils/lang";
import { slugify } from "~/utils/slug";

export default {
  head() {
    return {
      title: this.$t("navbar.projects")
    };
  },
  methods: { slugify },
  mounted() {
    if (this.$route.hash)
      document.querySelector(this.$route.hash).scrollIntoView();
    // console.log(this.$route.hash);
  },

  async asyncData({ $prismic, i18n, params, error }) {
    const lang = resolveLang(i18n.locale);

    const document = await $prismic.api.query(
      $prismic.predicates.at("document.type", "categories"),
      {
        fetchLinks: "projects.title,projects.excerpt,projects.secondary_cover",
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
