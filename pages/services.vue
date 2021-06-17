<template>
  <div>
    <prismic-rich-text
      class="text-2xl md:text-4xl font-bold mb-10 md:mb-20 "
      :field="title"
    />

    <div>
      <div
        class="mb-20 pb-16"
        v-for="(service, i) in document.results[0].data.body"
        :key="`service-${i}`"
      >
        <prismic-rich-text
          :id="slugify($prismic.asText(service.primary.service_title))"
          class="section-title"
          :field="service.primary.service_title"
        />
        <prismic-rich-text
          class="lg:w-1/2 mx-auto text-lg"
          :field="service.primary.description"
        />

        <div class="my-20">
          <h3 class="text-2xl mb-4 font-semibold">{{ $t("Work examples") }}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <figure
              class="aspect-w-4 aspect-h-3"
              v-for="(imageItem, i) in service.items"
              :key="`image-item-${i}`"
            >
              <prismic-image
                class="object-cover"
                :field="imageItem.gallery_image"
              />
            </figure>
          </div>
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
    return [
      {
        title: this.$prismic.asText(this.title)
      }
    ];
  },
  methods: { slugify },
  async asyncData({ $prismic, i18n, params, store, error }) {
    const lang = resolveLang(i18n.locale);

    const document = await $prismic.api.query(
      $prismic.predicates.at("document.type", "services"),
      { lang }
    );

    if (document) {
      const title = document.results[0].data.page_title;

      return { document, title };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
});
</script>

<style></style>
