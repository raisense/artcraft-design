<template>
  <div>
    <div
      class="featured-image"
      :style="{
        'background-image': `url(${document.data.featured_image.url})`
      }"
    >
      <div class="featured-image-content mb-10">
        <h1 class="text-4xl md:text-6xl text-white font-semibold">
          {{ $prismic.asText(document.data.title) }}
        </h1>
      </div>
      <div class="scroll-icon">
        <MouseScrollIcon />
      </div>
    </div>

    <Container class="grid grid-cols-1 md:grid-cols-12 lg:py-14 py-10">
      <div class="col-span-4 mb-10">
        <h2 class="mb-8 text-2xl md:text-3xl font-semibold">
          Scope of work
        </h2>
        <prismic-rich-text class="" :field="document.data.scope_of_work" />
      </div>
      <div class="col-span-8">
        <h2 class="mb-8 text-2xl md:text-3xl font-semibold">
          {{ $prismic.asText(document.data.title) }}
        </h2>
        <prismic-rich-text
          class="column-count-3"
          :field="document.data.description"
        />
        <div class="mt-5 flex flex-col items-end">
          <div class="text-semibold">
            <div class="text-semibold">
              {{ $t("Year") }}: {{ document.data.year }}
            </div>
            <div class="text-semibold">
              {{ $t("Website") }}:
              <a
                target="_blank"
                class="underline"
                :href="document.data.website.url"
              >
                {{ document.data.website.url.split("://")[1] }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
    <template v-for="(slice, i) in document.data.body">
      <nuxt-img
        class="w-full"
        v-if="slice.slice_type === 'image'"
        :src="slice.primary.image.url"
        :key="`slice-${i}`"
      />
      <prismic-embed
        class="w-full aspect-w-3 aspect-h-4 lg:aspect-w-16 lg:aspect-h-9"
        v-if="slice.slice_type === 'embed'"
        :key="`slice-${i}`"
        :field="slice.primary.embed"
      />
      <Container v-else :key="`slice-${i}`" class="my-12">
        <prismic-rich-text
          class="text-xl mx-auto md:w-1/2"
          :field="slice.primary.text"
        />
      </Container>
    </template>
    <nuxt-link
      class="more-btn my-20 text-center block text-3xl"
      :to="localePath('/projects')"
    >
      {{ $t("Other projects") }}
      <svg-icon class="inline-block" icon="chevron-right" />
    </nuxt-link>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

import { resolveLang } from "~/utils/lang";

export default defineComponent({
  head() {
    return {
      title: this.$prismic.asText(this.document.data.title),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$prismic.asText(this.document.data.excerpt)
        }
      ]
    };
  },
  layout: "project",
  setup() {},
  async asyncData({ $prismic, i18n, params, store, error }) {
    const lang = resolveLang(i18n.locale);

    const document = await $prismic.api.getByUID("projects", params.id, {
      lang
    });

    if (document) {
      store.commit("SET_ALTERNATE_LANGS", document.alternate_languages);

      return { document };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  mounted() {
    // this.$i18n.onBeforeLanguageSwitch = (oldLocale, newLocale) => {
    //   const lang = resolveLang(newLocale);
    //   const otherLang = this.$store.state.alternate_langs.find(
    //     t => t.lang === lang
    //   );
    //   const uid = otherLang ? otherLang.uid : this.$route.params.id;
    //   this.$router.push(this.localePath(`/projects/${uid}`));
    // };
  }
});
</script>

<style>
.featured-image {
  width: 100%;
  min-height: 300px;
  height: calc(100vh - 64px);
  background-size: cover;
  background-position: center;

  @apply flex justify-center items-center relative;
}

.featured-image:before {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.featured-image .featured-image-content {
  position: relative;
  z-index: 20;
}

.featured-image .scroll-icon {
  @apply w-full flex justify-center absolute bottom-4;
}

.more-btn .icon {
  transition: all ease-in-out 0.12s;
}
.more-btn:hover .icon {
  transform: translateX(15px);
}

.column-count-3 {
  -webkit-column-count: 3; /* Chrome, Safari, Opera */
  -moz-column-count: 3; /* Firefox */
  column-count: 3;
  /* column-fill: auto; */
}

@media (max-width: 768px) {
  .column-count-3 {
    -webkit-column-count: 2; /* Chrome, Safari, Opera */
    -moz-column-count: 2; /* Firefox */
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .column-count-3 {
    -webkit-column-count: 1; /* Chrome, Safari, Opera */
    -moz-column-count: 1; /* Firefox */
    column-count: 1;
  }
}
</style>
