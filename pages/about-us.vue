<template>
  <article class="py-10 lg:py-14">
    <prismic-rich-text
      class="container mx-auto px-8 lg:px-0 text-2xl sm:text-4xl font-bold mb-10"
      :field="document.data.page_title"
    />
    <template v-for="(slice, index) in document.data.body">
      <div v-if="slice.slice_type === 'about_section'" :key="`body-${index}`">
        <prismic-rich-text
          class="section-title"
          :field="slice.primary.section_title"
        />
        <prismic-rich-text
          class="section-content"
          :field="slice.primary.section_content"
        />
      </div>
      <div
        class="container mx-auto my-16"
        v-if="slice.slice_type === 'alternategrid'"
        :key="`body-${index}`"
      >
        <div
          v-for="(item, index) in slice.items"
          :key="`alternate-grid-${index}`"
          class="grid grid-cols-1 sm:grid-cols-2"
        >
          <prismic-rich-text
            class="px-4 py-10 text-2xl sm:text-4xl flex justify-center items-center font-semibold"
            :class="{
              'sm:order-last': index % 2 === 0
            }"
            :style="{
              'background-color': item.title_background_color,
              color: item.title_text_color
            }"
            :field="item.title"
          />
          <prismic-rich-text
            class="md:bg-[#F2F2F2] sm:min-h-auto md:min-h-[350px] lg:min-h-[450px] xl:min-h-[550px] py-6 px-8 md:p-20 flex sm:text-lg sm:leading-8 justify-center items-center"
            :field="item.description"
          />
        </div>
        <prismic-rich-text :field="slice.primary.section_content" />
      </div>
      <div v-if="slice.slice_type === 'team'" :key="`body-${index}`">
        <Container>
          <prismic-rich-text
            class="section-title"
            :field="slice.primary.title"
          />
          <div
            class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-10"
          >
            <div
              class="mb-4"
              v-for="(member, index) in slice.items"
              :key="`member-${index}`"
            >
              <nuxt-picture
                class="block aspect-w-1 aspect-h-1"
                :title="$prismic.asText(member.member_name)"
                :src="member.member_image.url"
                :alt="$prismic.asText(member.member_name)"
              />
              <p class="mt-4 font-semibold text-lg md:text-xl">
                {{ $prismic.asText(member.member_name) }}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </template>
  </article>
</template>

<script>
import { resolveLang } from "~/utils/lang";

export default {
  layout: "project",
  head() {
    return {
      title: this.$prismic.asText(this.document.data.page_title)
    };
  },
  async asyncData({ $prismic, i18n, params, store, error }) {
    const lang = resolveLang(i18n.locale);

    const document = await $prismic.api.getSingle("about_us", { lang });

    if (document) {
      return { document };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
};
</script>

<style>
.section-content p:not(.block-img) {
  @apply text-base sm:text-lg container px-8 md:px-0 w-full md:w-1/2 mx-auto;
}

.section-content p.block-img > img {
  @apply w-full my-6 sm:mt-10 sm:mb-12 md:mb-20;
}
</style>
