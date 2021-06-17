<template>
  <div>
    <h1 class="text-2xl md:text-4xl font-bold mb-10 md:mb-20">
      {{ $t("navbar.clients") }}
    </h1>

    <div class="bg-[#C4C4C4] p-[1px] grid grid-cols-2 lg:grid-cols-4 gap-[1px]">
      <a
        class="block"
        :href="client.data.link.url"
        v-for="(client, i) in document.results"
        :key="`client-${i}`"
      >
        <nuxt-picture
          class="block aspect-w-1 aspect-h-1"
          :src="client.data.client_image.url"
        />
      </a>
    </div>
  </div>
</template>

<script>
import { resolveLang } from "~/utils/lang";

export default {
  head() {
    return {
      title: this.$t("navbar.clients")
    };
  },
  async asyncData({ $prismic, i18n, error }) {
    const lang = resolveLang(i18n.locale);

    const document = await $prismic.api.query(
      $prismic.predicates.at("document.type", "clients"),
      { lang }
    );

    if (document) {
      // store.commit("SET_ALTERNATE_LANGS", document.alternate_languages);

      return { document };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
};
</script>

<style></style>
