<template>
  <div>
    <div class="text-2xl md:text-3xl font-bold mb-10 md:mb-20 ">
      <h1>{{ $t("Our Services") }}</h1>
    </div>

    <div>
      <div class="mb-30" v-for="service in document.results" :key="service.id">
        <prismic-rich-text
          :id="slugify($prismic.asText(service.data.service_title))"
          class="section-title"
          :field="service.data.service_title"
        />
        <prismic-rich-text
          class="lg:w-1/2 mx-auto text-lg"
          :field="service.data.description"
        />

        <div class="my-20 flow-root">
          <h3 class="text-2xl mb-4 font-semibold">{{ $t("Work examples") }}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <nuxt-link
              v-for="(project, i) in service.data.service_projects"
              :key="`image-item-${i}`"
              :to="localePath(`/projects/${project.service_project.uid}`)"
            >
              <figure class="aspect-w-4 aspect-h-3">
                <prismic-image
                  class="object-cover"
                  :field="project.service_project.data.featured_image"
                />
              </figure>
            </nuxt-link>
          </div>
          <nuxt-link
            class="more-btn float-right mt-5 font-semibold hover:underline"
            v-if="service.data.other_projects_link.uid"
            :to="
              localePath(`/projects/#${service.data.other_projects_link.uid}`)
            "
          >
            Другие проекты
            <svg-icon class="inline-block" icon="chevron-right" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import { resolveLang } from "~/utils/lang";
import { slugify } from "~/utils/slug";

export default defineComponent({
  head() {
    return {
      title: this.$t("Our Services")
    };
  },
  methods: { slugify },
  mounted() {
    if (this.$route.hash)
      document
        .querySelector(this.$route.hash)
        .scrollIntoView({ behavior: "smooth" });
  },
  async asyncData({ $prismic, i18n, params, store, error }) {
    const lang = resolveLang(i18n.locale);

    const document = await $prismic.api.query(
      $prismic.predicates.at("document.type", "services"),
      {
        fetchLinks: "projects.title,projects.featured_image",
        lang
      }
    );

    if (document) {
      return { document };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
});
</script>

<style></style>
