<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold mb-10 md:mb-20">
      {{ $t("navbar.clients") }}
    </h1>

    <section
      v-for="(group, index) in document.data.body"
      :key="`group-${index}`"
      class="mb-30"
    >
      <prismic-rich-text class="section-title" :field="group.primary.name" />
      <div
        class="bg-[#C4C4C4] p-[1px] grid grid-cols-2 lg:grid-cols-4 gap-[1px]"
      >
        <a
          class="block"
          :target="client.client_website.target"
          :href="client.client_website.url"
          v-for="(client, i) in group.items"
          :key="`client-${i}`"
        >
          <nuxt-picture
            class="block aspect-w-1 aspect-h-1"
            :src="client.client_image.url"
            :alt="client.client_image.alt"
          />
        </a>
      </div>
    </section>
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

    const document = await $prismic.api.getSingle("clients_page", { lang });

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
