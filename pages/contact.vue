<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div>
      <h2 class="text-3xl mb-8 font-semibold">{{ $t("navbar.contact") }}</h2>
      <a class="block" :href="fields.email.url">
        {{ fields.email.url.slice(7) }}
      </a>

      <a
        v-for="phone in fields.phone_numbers"
        :key="phone.text"
        class="block font-bold"
        :href="`tel:${phone.text}`"
      >
        {{ phone.text }}
      </a>
      <div class="w-full lg:w-3/5 mt-10">
        <a target="_blank" :href="generateMapLink(fields.address_location)">
          {{ fields.address_text[0].text }}
        </a>
      </div>
    </div>
    <div class="mt-10 md:mt-0">
      <h2 class="text-3xl mb-8 font-semibold">
        {{ $t("Social links") }}
      </h2>
      <div class="grid grid-cols-2">
        <a
          v-for="(social, i) in fields.social_links"
          :key="`social-${i}`"
          :href="social.social_link.url"
        >
          {{ social.social_name[0].text }}
        </a>
      </div>
    </div>
    <div class="mt-10 md:mt-0">
      <h2 class="text-3xl mb-8 font-semibold">
        {{ $t("Contact us") }}
      </h2>
      <form netlify name="contact-us">
        <input
          class="form-field w-full"
          name="first_name"
          type="text"
          :placeholder="$t('First name')"
        />
        <input
          class="form-field w-full"
          name="email"
          type="text"
          :placeholder="$t('E-mail')"
        />
        <input
          class="form-field w-full"
          type="text"
          name="phone_number"
          :placeholder="$t('Phone number')"
        />
        <textarea
          class="form-field w-full"
          name="message"
          rows="5"
          :placeholder="$t('Your message')"
        />
        <button class="btn-submit" type="submit">
          {{ $t("Send") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, useMeta } from "@nuxtjs/composition-api";
import { resolveLang } from "~/utils/lang";

export default defineComponent({
  head() {
    return {
      title: this.$t("navbar.contact")
    };
  },
  setup() {
    const generateMapLink = ({ longitude, latitude }) =>
      `http://www.google.com/maps/place/${latitude},${longitude}`;

    return { generateMapLink };
  },
  async asyncData({ $prismic, i18n, params, store, error }) {
    const lang = resolveLang(i18n.locale);

    const document = await $prismic.api.query(
      $prismic.predicates.at("document.type", "contact"),
      { lang }
    );

    if (document) {
      // store.commit("SET_ALTERNATE_LANGS", document.alternate_languages);
      const fields = document.results[0].data;

      return { document, fields };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
});
</script>

<style>
.form-field {
  @apply bg-black focus:bg-yellow-100 text-lg bg-opacity-5 block px-5 py-4 mb-4;
}

.btn-submit {
  @apply text-black bg-black transition-all hover:text-white hover:bg-opacity-100 bg-opacity-5 px-10 py-4 text-lg;
}
</style>
